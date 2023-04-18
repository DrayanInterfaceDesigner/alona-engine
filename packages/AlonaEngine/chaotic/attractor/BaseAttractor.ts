import Vector3 from '../../physics/Vector3'
import { hsv_by_distance, lerp_color } from '../../art/Color'
import { lerp } from '../../arithmetic/Arithmetic'
import AlonaEngine from '../../AlonaEngine'
import { trace, tracer } from '../../render/drawers'
import * as THREE from 'three'

class BaseAttractor {

    // delta time (scale)
    public dt: number = .01

    // structure size (scale)
    public scale_factor: number = 1

    // Rendering vectors
    public points: Array<THREE.Vector3> = new Array<THREE.Vector3>(new THREE.Vector3(0,0,0))
    public entity_body: THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    public colors: Array<any> = new Array<any>()
    public gradient: any = new Object()

    // Engine
    public engine: AlonaEngine

    // Physics Vectors
    public initial_pos: Vector3
    protected _position: Vector3 
    protected _last_pos: Vector3
    protected _d: Vector3 = new Vector3().ZERO()

    // Vector3 size limit (threshold > 2000 tends to get really slow)
    protected _point_array_threshold = 1000
    
    // [Performance Advice] Zoom: You should prioritize zooming over scaling.
    public zoom: number
    protected _zoom_current: number = 0
    protected _zoom_step: number = .1

    // Cosmetics
    public flex_rotation: Vector3
    public smooth_factor: number

    constructor(engine: AlonaEngine, config?: any) {
        this.engine = engine
        this.initial_pos = config.initial_pos ? config.initial_pos : new Vector3().ZERO()
        this.dt = config?.dt ? config.dt : this.dt
        this.scale_factor = config?.scale_factor ? config.scale_factor : this.scale_factor

        //to "fix" a bug, yet to be actually fixed
        this.entity_body = trace(this.points, this.colors)

        this.points.push(new THREE.Vector3(1,1,1))
        this._position = new Vector3(this.initial_pos.x, this.initial_pos.y, this.initial_pos.z)
        this._last_pos = new Vector3(this._position.x, this._position.y, this._position.z)
        this.gradient = config.gradient ? config.gradient : null
        this.smooth_factor = config.smooth_factor ? config.smooth_factor : 5
        this._d

        this._zoom_current = 0
        this.zoom = config.zoom ? config.zoom : null

        this.flex_rotation = new Vector3().ZERO()
    }

    flex_rotating(delta: number): void {
        this.flex_rotation.x += delta
        this.flex_rotation.x += delta
        this.flex_rotation.z += delta
        this.entity_body.rotateX(this.flex_rotation.x)
        this.entity_body.rotateY(this.flex_rotation.x)
        this.entity_body.rotateZ(this.flex_rotation.z)
    }

    smooth_zoom(): void {
        if(this.zoom == null) return
        if(this._zoom_current <= this.zoom) {

            this._zoom_current += this._zoom_step
            this._zoom_step = lerp(this._zoom_step, .0007, .01)
            this.engine.render.camera.zoom = this._zoom_current
        }
        
    }

    blowup_block() {
        this._d.x %= 2000
        this._d.y %= 2000
        this._d.z %= 2000
    }
    
    // Set the equations here
    attractor(delta: number): void {}

    sum_ends(delta: number): void {
        this.blowup_block()
        this._position.x += this._d.x * this.dt 
        this._position.y += this._d.y * this.dt 
        this._position.z += this._d.z * this.dt 
    }

    set_boundaries() {
        if(!isFinite(this._position.x) || !isFinite(this._position.y) || !isFinite(this._position.z)) {
            this._position.x = this._last_pos.x
            this._position.y = this._last_pos.y
            this._position.z = this._last_pos.z
            this.points.pop()
            this.points = this.points.filter(p => {
                if(!isFinite(p.x) || !isFinite(p.y) || !isFinite(p.z)) {
                    return p
                }
            })
            return
        }
    }

    update(delta: number): any {
        
        this.attractor(delta)
        this.sum_ends(delta)
        this.set_boundaries()

        const point: THREE.Vector3 = new THREE.Vector3(this._position.x, this._position.y, this._position.z).multiplyScalar(this.scale_factor)
        // const color: any = hsv_by_distance(new Vector3(this._position.x, this._position.y, this._position.z), new Vector3(1,1,1))

        this.points.push(point)
        this.colors.push(this.color())
        if(this.points.length >= this._point_array_threshold) {
            this.points.shift()
            this.colors.shift()
        }
        
        return {points: this.points, colors: this.colors}
    }

    color() {
        if(this.gradient == null) return {r: 255, g: 255, b: 255}
        let origin = this.gradient.origin ? this.gradient.origin : new Vector3().ZERO()
        const grad_scale = this.gradient.gradient_scale ? this.gradient.gradient_scale : 30
        const dist = (this._position.distance_to(origin) / grad_scale) % 1
        return lerp_color(this.gradient.colors.from, this.gradient.colors.to, dist)
    }
    
    render(delta: number):void {
        this.smooth_zoom()
        this.engine.remove(this.entity_body)
        this.entity_body = tracer(this.points, this.colors, this.smooth_factor)
        this.engine.add(this.entity_body)
        this.update(delta)

    }
}

export default BaseAttractor