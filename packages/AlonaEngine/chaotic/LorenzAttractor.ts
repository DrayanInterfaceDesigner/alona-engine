import Vector3 from '../physics/Vector3'
import { hsv_by_distance, hsv_to_rgb } from '../art/Color'
import AlonaEngine from '../AlonaEngine'
import { trace } from '../render/drawers'

class LorenzAttractor {

    public initial_x: number = .01
    public initial_y: number = .01
    public initial_z: number = .01
    public sigma: number = 10
    public rho: number = 28
    public beta: number = 8.0/3.0
    public dt: number = .01
    public scale_factor: number = 1
    public points: Array<Vector3> = new Array<Vector3>()
    public colors: Array<any> = new Array<any>()
    public renderer: AlonaEngine
    public entity_body: THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    private _x: number = this.initial_x
    private _y: number = this.initial_y
    private _z: number = this.initial_z
    private _last_x: number = this._x
    private _last_y: number = this._y
    private _last_z: number = this._z
    private _dx: number = 0
    private _dy: number = 0
    private _dz: number = 0
    private _point_array_threshold = 2000

    

    constructor(renderer: AlonaEngine, config?: any) {
        this.renderer = renderer
        this.initial_x = config?.x ? config.x : this.initial_x
        this.initial_y = config?.y ? config.y : this.initial_y
        this.initial_z = config?.z ? config.z : this.initial_z
        this.dt = config?.dt ? config.dt : this.dt
        this.scale_factor = config?.scale_factor ? config.scale_factor : this.scale_factor
        this.entity_body = trace(this.points, this.colors)
        this.sigma
        this.rho
        this.beta
        this._x
        this._y
        this._z
        this._dx
        this._dy
        this._dz
        this._last_x
        this._last_y
        this._last_z
    }

    attractor(): void {
        this._dx = (this.sigma * (this._y - this._x))
        this._dy = (this._x * (this.rho - this._z) - this._y) 
        this._dz = (this._x * this._y - this.beta * this._z)
    }

    update(delta: number): any {
        this.attractor()
        this._x += this._dx * this.dt
        this._y += this._dy * this.dt
        this._z += this._dz * this.dt
        // stucks if undefined at some state
        // console.log(this._x, this._y, this._z)
        if(Number.isNaN(this._x) || Number.isNaN(this._y) || Number.isNaN(this._z)) {
            this._x = this._last_x
            this._y = this._last_y
            this._z = this._last_z
            console.log('hi', this._last_x, this._last_y, this._last_z)
        }
        
        if(this._x == undefined || this._y == undefined || this._z == undefined) {
            this._x = this._last_x
            this._y = this._last_y
            this._z = this._last_z
        }

        else if(!isFinite(this._x) || !isFinite(this._y) || !isFinite(this._z)) {
            this._x = this._last_x
            this._y = this._last_y
            this._z = this._last_z
        }
        // redefines last state
        else {
            this._last_x = this._x
            this._last_y = this._y
            this._last_z = this._z
        }

        if(this.points.length >= this._point_array_threshold) {
            this.points.shift()
        }
        
        const point: Vector3 = new Vector3(this._x, this._y, this._z)
        const {h, s, v}= hsv_by_distance(point, new Vector3(1,1,1))
        const color: any = hsv_to_rgb(h,s,v)

        this.points.push(point.scale(this.scale_factor))
        this.colors.push(color)

        return {points: this.points, colors: this.colors}
    }
    
    render(delta: number) {
        this.renderer.remove(this.entity_body)
        this.entity_body = trace(this.points, this.colors)
        this.renderer.add(this.entity_body)
        this.update(delta)
    }
}

export default LorenzAttractor