import AlonaEngine from "../../AlonaEngine"
import Vector3 from "../../physics/Vector3"
import BaseAttractor from "./BaseAttractor"

class Lorenz extends BaseAttractor {
    // constants
    public sigma: number = 10
    public rho: number = 28
    public beta: number = 8.0/3.0
    
    constructor(renderer: AlonaEngine, config: any) {
        super(renderer, config)
        this.dt = config.dt ? config.dt : 0.01
        this.initial_pos = new Vector3(.1, .1, .1)
        this._position = this.initial_pos
    }

    attractor(delta: number): void {
        this._d.x = (this.sigma * (this._position.y - this._position.x)) 
        this._d.y = (this._position.x * (this.rho - this._position.z) - this._position.y)  
        this._d.z = (this._position.x * this._position.y - this.beta * this._position.z) 
    }
}

export default Lorenz