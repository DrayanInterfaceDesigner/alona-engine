import Render from './render/Render'
import {Clock} from 'three'
import * as THREE from 'three'

class AlonaEngine {

    public parent: any = document.body
    public config: any = {
        width: window.innerWidth,
        height: window.innerHeight,
        app_scale: 1,
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.6,
        far: 1200,
        antialias: true,
        clear_color: "#000000",
        line_color: "#2eff8f",
        point_array_threshold: 2000,
        dot_scale: 30,
        rotate_speed: 5,
        dynamic_damping_factor: .015,
        increment: 0.0
    }
    public render: Render
    private _clock: Clock
    public increment: number = 0.0
    public incrementer: number = 0.0

    constructor(parent?: any, config?: any) {
        this.parent = parent ? parent : this.parent
        this.config = config? config : this.config
        this.render = new Render(this.parent, this.config)
        this._clock = new Clock()
        this.increment = this.config.increment
        this.incrementer
        this.process
        this.physics_process = this.physics_process.bind(THREE)
        this.run = this.run.bind(this)
        this.setup()
    }

    add(...object: THREE.Object3D[]) {
        this.render.scene.add(...object)
    }
    remove(...object: THREE.Object3D[]) {
        this.render.scene.remove(...object)
    }
    setup() {
        this.render.setup()
    }
    update() {
        this.increment = this.config.increment
        this.incrementer += this.increment
        this.render.controls.update()
        this.render.camera.updateProjectionMatrix()
    }
    mark_center() {
        const geometry = new THREE.CircleGeometry( 5, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const circle = new THREE.Mesh( geometry, material );
        circle.translateX(0)
        circle.translateY(0)
        circle.translateZ(0)
        this.add(circle)
    }
    
    time_stamp() {
        const time = new Date()
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    }

    process(delta: number) {}
    physics_process(delta: number) {}

    run() {
        const delta_time = this._clock.getDelta()
        const time_elapsed = this._clock.getElapsedTime()

        this.process(delta_time)
        this.physics_process(delta_time)
        this.update()

        this.render.update()
        requestAnimationFrame(this.run)
    }

}

export default AlonaEngine