import AlonaEngine from "../AlonaEngine"
import Vector3 from "../physics/Vector3"
import BaseAttractor from "./BaseAttractor"

class HalvorsenAttractor extends BaseAttractor {

    public alpha: number
    constructor(renderer: AlonaEngine, config: any) {
        super(renderer, config)
        this.alpha = 1.6
        this.initial_pos = new Vector3(1,0,0)
        this._position = this.initial_pos
        this._point_array_threshold = 2000
    }

    attractor(delta: number): void {
        
        this._d.x = (
            (-this.alpha * this._position.x) - (4 * this._position.y) 
            - (4 * this._position.z) - Math.pow(this._position.y,2)
        )

        this._d.y = (
            (-this.alpha * this._position.y) - (4 * this._position.z) 
            - (4 * this._position.x) - Math.pow(this._position.z,2)
        )

        this._d.z = (
            (-this.alpha * this._position.z) - (4 * this._position.x) 
            - (4 * this._position.y) - Math.pow(this._position.x,2)
            )
    }
}

export default HalvorsenAttractor
