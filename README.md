# alona-engine
 physics engine - easier simulations on browser
 version 1.2.1-alpha

### A Humble beginning
Hey, you! This is a work-in-progress project, and I've just started it, so there's not much to see here yet. But if you want to run the simulation and orbit it around, feel free to do so.

Just keep in mind that Alona is currently in alpha, so there may be bugs and incomplete features. Thanks for your interest!
 
 **Note:** Don't forget to compile the TS before doing it.
 > npm install
 
 > npm run dev

### Quick tutorial:

1. Grab the parent element

> const parent = document.querySelector('#app')

2. Call the engine and pass the parent as the 1st parameter.

> const Alona = new AlonaEngine(parent)

3. Create a new simulation (for now, only strange attractors are available)

> const Lorenz = new LorenzAttractor(Alona, {
>  scale_factor: 7
> })

3. Overwrite Alona's physics process to run the Lorenz Attractor
> Alona.physics_process = (delta: number) => {
>  Lorenz.render(delta)
> }

4. Run Alona

> Alona.run()
