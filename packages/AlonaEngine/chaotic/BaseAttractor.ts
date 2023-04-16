import Vector3 from '../physics/Vector3'
import { hsv_by_distance } from '../art/Color'
import AlonaEngine from '../AlonaEngine'
import { trace, tracer } from '../render/drawers'
import * as THREE from 'three'

class BaseAttractor {

    // constants
    public sigma: number = 10
    public rho: number = 28
    public beta: number = 8.0/3.0

    // delta time (scale)
    public dt: number = .01

    // structure size (scale)
    public scale_factor: number = 1

    // Rendering vectors
    public points: Array<THREE.Vector3> = new Array<THREE.Vector3>(new THREE.Vector3(0,0,0))
    public entity_body: THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    public colors: Array<any> = new Array<any>()

    // Engine
    public renderer: AlonaEngine

    // Physics Vectors
    public initial_pos: Vector3
    protected _position: Vector3 
    protected _last_pos: Vector3
    protected _d: Vector3 = new Vector3().ZERO()

    // Vector3 size limit (threshold > 2000 tends to get really slow)
    protected _point_array_threshold = 1000

    constructor(renderer: AlonaEngine, config?: any) {
        this.renderer = renderer
        this.initial_pos = config.initial_pos ? config.initial_pos : new Vector3().ZERO()
        this.dt = config?.dt ? config.dt : this.dt
        this.scale_factor = config?.scale_factor ? config.scale_factor : this.scale_factor

        //to "fix" a bug, yet to be actually fixed
        this.entity_body = trace(this.points, this.colors)

        this.points.push(new THREE.Vector3(1,1,1))
        this._position = new Vector3(this.initial_pos.x, this.initial_pos.y, this.initial_pos.z)
        this._last_pos = new Vector3(this._position.x, this._position.y, this._position.z)
        this._d
        this.sigma
        this.rho
        this.beta
    }

    // Set the equations here
    attractor(delta: number): void {}

    sum_ends(delta: number): void {
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
        const color: any = hsv_by_distance(new Vector3(this._position.x, this._position.y, this._position.z), new Vector3(1,1,1))

        this.points.push(point)
        this.colors.push(color)
        if(this.points.length >= this._point_array_threshold) {
            this.points.shift()
            this.colors.shift()
        }
        
        return {points: this.points, colors: this.colors}
    }

    
    render(delta: number):void {
        this.renderer.remove(this.entity_body)
        this.entity_body = tracer(this.points, this.colors)
        this.renderer.add(this.entity_body)
        this.update(delta)

    }
}

export default BaseAttractor