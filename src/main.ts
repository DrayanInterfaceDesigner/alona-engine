import AlonaEngine from '../packages/AlonaEngine/AlonaEngine'
import LorenzAttractor from '../packages/AlonaEngine/chaotic/LorenzAttractor'

//Grabs the parent div to inject the canvas
const parent = document.querySelector('#app')

//Creates a new Engine instance
const Alona = new AlonaEngine(parent)

//Creates a Lorenz Attractor instance, then scales it 7x
const Lorenz = new LorenzAttractor(Alona, {
  scale_factor: 7
})

// Overwrites Alona _process
// process is meant to run after physics_process
// In the future, physics_process will have high
// render priority, so avoid updating physics
// here.
Alona.process = (delta: number) => {

  // Marks the center with a dot
  Alona.mark_center()
  Alona.update()

  // Logs the time stamp at framerate
  console.log(Alona.time_stamp())
}

// Overwrites Alona _physics_process
// Use this to update physics.
Alona.physics_process = (delta: number) => {
  Lorenz.render(delta)
}
Alona.run()

