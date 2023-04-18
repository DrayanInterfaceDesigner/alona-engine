// import Vector3 from '../physics/Vector3'
// import AlonaEngine from "../AlonaEngine"
// import BaseAttractor from "./BaseAttractor"
// import { hsv_by_distance } from '../art/Color'
// import { trace } from '../render/drawers'

// // class HalvorsenAttractor extends BaseAttractor {

// //     public alpha:number = 1.6
// //     public initial_pos: Vector3 = new Vector3(1,0,0)
// //     constructor(renderer: AlonaEngine, config: any) {
// //         super(renderer, config)
// //         this.alpha
// //         super.initial_pos = (
// //             this.initial_pos = config.initial_pos ? 
// //             config.initial_pos : new Vector3(1, 0, 0)
// //         )
// //     }

// //     attractor(delta: number): void {
        
// //         this._d.x = (
// //             (-this.alpha * this._position.x) - (4 * this._position.y) 
// //             - (4 * this._position.z) - Math.pow(this._position.y,2)
// //         )

// //         this._d.y = (
// //             (-this.alpha * this._position.y) - (4 * this._position.z) 
// //             - (4 * this._position.x) - Math.pow(this._position.z,2)
// //         )

// //         this._d.z = (
// //             (-this.alpha * this._position.z) - (4 * this._position.x) 
// //             - (4 * this._position.y) - Math.pow(this._position.x,2)
// //             )
// //         // console.log(this.initial_pos, this.alpha)
// //         console.log(this)
// //     }
// // }

// // export default HalvorsenAttractor

// class HalvorsenAttractor {

//     public initial_x: number = 1
//     public initial_y: number = 0
//     public initial_z: number = 0
//     public alpha: number = 1.6
//     public dt: number = .01
//     public scale_factor: number = 1
//     public points: Array<Vector3> = new Array<Vector3>()
//     public colors: Array<any> = new Array<any>()
//     public renderer: AlonaEngine
//     public entity_body: THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
//     private _x: number = this.initial_x
//     private _y: number = this.initial_y
//     private _z: number = this.initial_z
//     private _last_x: number = this._x
//     private _last_y: number = this._y
//     private _last_z: number = this._z
//     private _dx: number = 0
//     private _dy: number = 0
//     private _dz: number = 0
//     private _point_array_threshold = 2000
//     public i = 0.00
//     public j = 0.00
//     public k = 0.00
//     public stop: boolean = false


//     constructor(renderer: AlonaEngine, config?: any) {
//         this.renderer = renderer
//         this.initial_x = config?.x ? config.x : this.initial_x
//         this.initial_y = config?.y ? config.y : this.initial_y
//         this.initial_z = config?.z ? config.z : this.initial_z
//         this.dt = config?.dt ? config.dt : this.dt
//         this.scale_factor = config?.scale_factor ? config.scale_factor : this.scale_factor
//         this.entity_body = trace(this.points, this.colors)
//         this.alpha
//         this._x
//         this._y
//         this._z
//         this._dx
//         this._dy
//         this._dz
//         this._last_x
//         this._last_y
//         this._last_z
//         this.i
//         this.j
//         this.k
//         this.stop
//     }

//     attractor(): void {
//         this._dx = (-this.alpha * this._x) - (4 * this._y) - (4 * this._z) - Math.pow(this._y,2)
//         this._dy = (-this.alpha * this._y) - (4 * this._z) - (4 * this._x) - Math.pow(this._z,2)
//         this._dz = (-this.alpha * this._z) - (4 * this._x) - (4 * this._y) - Math.pow(this._x,2)
//         console.log(this)
//     }

//     update(delta: number): any {
//         this.attractor()
//         this._x += this._dx * this.dt
//         this._y += this._dy * this.dt
//         this._z += this._dz * this.dt

//         // stucks if out-of-bounds at some state
//         if(!isFinite(this._x) || !isFinite(this._y) || !isFinite(this._z)) {
//             this._x = this._last_x
//             this._y = this._last_y
//             this._z = this._last_z
//             this.points.pop()
//             this.points = this.points.filter(p => {
//                 if(!isFinite(p.x) || !isFinite(p.y) || !isFinite(p.z)) {
//                     return p
//                 }
//             })
//             return
//         }

//         if(this.points.length >= this._point_array_threshold) {
//             this.points.shift()
//             this.colors.shift()
//         }
        
//         const point: Vector3 = new Vector3(this._x, this._y, this._z)
//         // const {h, s, v}= hsv_by_distance(point, new Vector3(1,1,1))
//         // const color: any = hsv_to_rgb(h,s,v)
//         const color: any = hsv_by_distance(point, new Vector3(1,1,1))
//         // console.log(color)

//         this.points.push(point.scale(this.scale_factor))
//         this.colors.push(color)
        
//         this.entity_body.rotateX(this.i)
//         this.entity_body.rotateY(this.j)
//         this.entity_body.rotateZ(this.k)

//         this.entity_body.rotateX(-3.0327412287183018)
//         this.entity_body.rotateY(0.9504440784612516)
//         this.entity_body.rotateZ(2.284073464102276)
//         // console.log(this.entity_body.rotation)
//         if(!(this.stop)) {
//             // this.i += 0.01
//         }
//         return {points: this.points, colors: this.colors}
//     }
    
//     render(delta: number) {
//         this.renderer.remove(this.entity_body)
//         this.entity_body = trace(this.points, this.colors)
//         this.renderer.add(this.entity_body)
//         this.update(delta)
//     }
// }

// export default HalvorsenAttractor