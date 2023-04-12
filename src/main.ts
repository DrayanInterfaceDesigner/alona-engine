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

// Alona has a scoped increment so you can change things
// using it instead of delta (if you want to)
Alona.config.increment = 0.01

// Overwrites Alona _process
// process is meant to run after physics_process
// In the future, physics_process will have high
// render priority, so avoid updating physics
// here
Alona.process = (delta: number) => {
  // Marks the center with a dot
  Alona.mark_center()
  // Logs the time stamp at framerate
  console.log(Alona.time_stamp())
  // console.log(new Date().getDate() , Alona.render.scene.children.length);
}

// Overwrites Alona _physics_process
// Use this to update physics.
Alona.physics_process = (delta: number) => {
  // Renders Lorenz
  Lorenz.render(delta)
}

// Starts the engine
Alona.run()

