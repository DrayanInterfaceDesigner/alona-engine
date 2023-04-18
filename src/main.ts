import AlonaEngine from '../packages/AlonaEngine/AlonaEngine'
import SprottLinzD from '../packages/AlonaEngine/chaotic/attractor/SprottLinzD'
import Vector3 from '../packages/AlonaEngine/physics/Vector3'

//Grabs the parent div to inject the canvas
const parent = document.querySelector('#app')

//Creates a new Engine instance
const Alona = new AlonaEngine(parent)

//Creates a Chaotic Attractor instance, then scales it 7x
const SprottLinzDAttractor = new SprottLinzD(Alona, {
  scale_factor: 1,
  smooth_factor: 5,
  zoom: 15,

  gradient: {
    colors: {
      from: {r: 86, g: 163, b: 245},
      to: {r: 191, g: 15, b: 250}
    },
    gradient_scale: 60,
    origin: new Vector3().ZERO()
  }
})


// Overwrites Alona _process
// process is meant to run after physics_process
// In the future, physics_process will have high
// render priority, so avoid updating physics
// here.
Alona.process = (delta: number) => {
  // Marks the center with a dot
  // Alona.mark_center()
  // Logs the time stamp at framerate
  console.log(Alona.time_stamp())
  Alona.update()
}

// Overwrites Alona _physics_process
// Use this to update physics.
Alona.physics_process = (delta: number) => {
  SprottLinzDAttractor.render(delta)
}
Alona.run()

