import AlonaEngine from "../../AlonaEngine"
import Vector3 from "../../physics/Vector3"
import BaseAttractor from "./BaseAttractor"

class SprottLinzD extends BaseAttractor {

    public alpha: number = 1.5
    constructor(renderer: AlonaEngine, config: any) {
        super(renderer, config)
        this.dt = config.dt ? config.dt : 0.1
        this.initial_pos = config.initial_pos ? config.initial_pos : new Vector3(1,0,0)
        this._position = this.initial_pos
        this._point_array_threshold = 2000
    }

    attractor(delta: number): void {
        this._d.x = -this._position.y
        this._d.y = this._position.x + this._position.z 
        this._d.z = (
            this._position.x 
            * this._position.z  
            + this.alpha 
            * Math.pow(this._position.y, 2)
        )
    }

    update(delta: number) {
        this.flex_rotating(.04 * delta)
        super.update(delta)
    }
}

export default SprottLinzD
