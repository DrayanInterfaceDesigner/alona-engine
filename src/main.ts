import AlonaEngine from '../packages/AlonaEngine/AlonaEngine'
import {trace} from '../packages/AlonaEngine/render/drawers'
import LorenzAttractor from '../packages/AlonaEngine/chaotic/LorenzAttractor'
import * as THREE from 'three'


const parent = document.querySelector('#app')
const Lorenz = new LorenzAttractor(.01, .01, .01, 10)
const Alona = new AlonaEngine(parent)
Alona.config.increment = 0.01

Alona.process = (delta: number) => {
  const geometry = new THREE.CircleGeometry( 5, 32 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const circle = new THREE.Mesh( geometry, material );
  circle.translateX(0)
  circle.translateY(0)
  circle.translateZ(0)
  // Alona.render.scene.add(circle)
  const time = new Date()
  console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

  // console.log(new Date().getDate() , Alona.render.scene.children.length);
}

let obj = trace(Lorenz.points, Lorenz.colors)
Alona.physics_process = (delta: number) => {
  Alona.render.scene.remove(obj)
  // Lorenz.update(Alona.config.increment)
  Lorenz.update(.01)
  obj = trace(Lorenz.points, Lorenz.colors)
  Alona.add(obj)
}

Alona.run()

