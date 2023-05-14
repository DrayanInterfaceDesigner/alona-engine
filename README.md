# Alona Engine

A physics engine for easier simulations on the browser. Current version: 1.3.0-alpha.

## A Humble Beginning

Hey, you! Thanks for your interest in Alona Engine. Please note that this is a work-in-progress project, so there may be bugs and incomplete features. If you'd like to run a simulation and orbit it around, feel free to do so! 

**Note:** Don't forget to compile the TypeScript code before running the engine:

 > npm install
 
 > npm run dev



## Quick Tutorial

1. Get the parent element:
```
const parent = document.querySelector('#app')
```

2. Call the engine and pass the parent element as the first parameter:
```
const Alona = new AlonaEngine(parent)
```

3. Create a new simulation (for now, only strange attractors are available):
```
> const Lorenz = new LorenzAttractor(Alona, {
>  scale_factor: 7
> })
```

4. Overwrite Alona's physics process to run the Lorenz Attractor:
```
> Alona.physics_process = (delta: number) => {
>  Lorenz.render(delta)
> }
```

5. Run Alona:

```
Alona.run()
```

