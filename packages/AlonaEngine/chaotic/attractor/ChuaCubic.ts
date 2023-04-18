import AlonaEngine from "../../AlonaEngine"
import Vector3 from "../../physics/Vector3"
import BaseAttractor from "./BaseAttractor"
import {lerp} from "../../arithmetic/Arithmetic"

  /**
   *
   * @warning
   * WARNING: This bad boi uses tons of cpu
   * @drayandev
   */
class ChuaCubic  extends BaseAttractor {

    public alpha: number = 10
    public rho: number = -.143
    public beta: number = 16
    constructor(renderer: AlonaEngine, config: any) {
        super(renderer, config)
        this.dt = config.dt ? config.dt : 0.01
        this.initial_pos = new Vector3(.1, .1, .1)
        this._position = this.initial_pos
        this._point_array_threshold = 4600
        this.zoom = config.zoom ? config.zoom : 60
        this._zoom_step = this.zoom * 0.01
    }

    attractor(delta: number): void {
        this._d.x = (
            this.alpha 
            * (this._position.y 
            - Math.pow(this._position.x,3) 
            - this.rho 
            * this._position.x)
        )
        this._d.y = this._position.x - this._position.y + this._position.z
        this._d.z = -this.beta * this._position.y
    }
}

export default ChuaCubic
