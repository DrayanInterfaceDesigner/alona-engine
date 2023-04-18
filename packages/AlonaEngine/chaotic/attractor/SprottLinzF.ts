import AlonaEngine from "../../AlonaEngine"
import Vector3 from "../../physics/Vector3"
import BaseAttractor from "./BaseAttractor"

  /**
   *
   * @warning
   * WARNING: This bad boi uses tons of cpu
   * @drayandev
   */
class SprottLinzF extends BaseAttractor {

    public alpha: number = .5
    constructor(renderer: AlonaEngine, config: any) {
        super(renderer, config)
        this.dt = config.dt ? config.dt : 0.04
        this.initial_pos = new Vector3(.1, 0, 0)
        this._position = this.initial_pos
        this._point_array_threshold = 2000
    }

    attractor(delta: number): void {
        this._d.x = this._position.y + this._position.z
        this._d.y = -this._position.x + this.alpha * this._position.y 
        this._d.z = Math.pow(this._position.x, 2) - this._position.z
    }
}

export default SprottLinzF
