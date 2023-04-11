import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Render {

    public config: any
    public parent: any 
    public scene: THREE.Scene 
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public controls: OrbitControls

    constructor(parent: any, config: any) {
        this.parent = parent
        this.config = config
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            this.config.fov, 
            this.config.aspect, 
            this.config.near, 
            this.config.far
        )
        this.renderer = new THREE.WebGLRenderer(
            {antialias: this.config.antialias}
        )
        this.controls = new OrbitControls(
            this.camera, this.renderer.domElement
        )
    }

    setup(): void {
        this.camera.position.set(0, 0, this.config.far / 2)
        this.renderer.setClearColor(this.config.clear_color)
        this.renderer.setSize(
            this.config.width * this.config.app_scale, 
            this.config.height * this.config.app_scale
        )
        this.parent.appendChild(this.renderer.domElement)

        window.addEventListener("resize", ()=> {
            this.renderer.setSize(
                this.config.width * this.config.app_scale, 
                this.config.height * this.config.app_scale
            )
            this.camera.aspect = this.config.aspect
            this.camera.updateProjectionMatrix()
        })
    }

    update(): void {
        this.renderer.render(this.scene, this.camera)
    }
}

export default Render