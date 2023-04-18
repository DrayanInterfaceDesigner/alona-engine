import {
    Line, 
    BufferGeometry, 
    BufferAttribute, 
    LineBasicMaterial} from 'three'
    import * as THREE from 'three';
    import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
    import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
    import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { lerp } from '../arithmetic/Arithmetic';
import Vector3 from '../physics/Vector3';



/** 
 * Traces the path of a given 
 * geometry and gives a color 
 * to each point.
 * WILL PROBABLY BE REMOVED*/ 
const trace = (points: any, colors: any):Line => {

    // Create a BufferGeometry to hold the line data
    const geometry = new BufferGeometry()

    // Convert the array of points to a Float32Array for use in the BufferGeometry
    const vertices = new Float32Array(points.length * 3)
    points.forEach((point:any , index: number) => {
      vertices[index * 3 + 0] = point.x
      vertices[index * 3 + 1] = point.y
      vertices[index * 3 + 2] = point.z
    })

    // Add the vertices data to the BufferGeometry
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))

    // Convert the array of colors to a Float32Array for use in the BufferGeometry
    const colorsArray = new Float32Array(colors.length * 3)
    colors.forEach((color: any, index: number) => {
      colorsArray[index * 3 + 0] = color.r / 255
      colorsArray[index * 3 + 1] = color.g / 255
      colorsArray[index * 3 + 2] = color.b / 255
    })

    // Add the colors data to the BufferGeometry
    geometry.setAttribute('color', new BufferAttribute(colorsArray, 3))
    // Create a material that uses vertex colors
    const material = new LineBasicMaterial({ vertexColors: true })
    // Create the line object
    const line = new Line(geometry, material)

    return line
}


/**
 * Traces the given path, adding the colors for each vertex
 *
 * @remarks 
 * WARNING!!! This function is EXPERIMENTAL, therefore prone to 
 * performance issues and can be removed.
 * 
 * The colors array is expected to have {r,g,b} objects
 *
 * @param points - Array containing the points to make the line
 * @param colors - Equal sized array containing the colors
 * @returns THREE.Line object
 *
 * @drayandev
 */
const tracer = (points: any, colors: any, smooth?: number): Line =>  {
  
  const scale = smooth ? smooth : 1 
  
  // fixes the first two points:zero colors ratio (min of 2 points are necessary for THREE curves)
  const colorsArray = new Float32Array(((colors.length * 3) * scale) + (2 * scale) * 3)
  colors.forEach((color: any, index: number) => {
      for(let k = 0; k < scale; k++) {
        colorsArray[(((index) * (3 * scale)) + (0 + (k * 3)))] = (Math.abs(color.r / 255))
        colorsArray[(((index) * (3 * scale)) + (1 + (k * 3)))] = (Math.abs(color.g / 255))
        colorsArray[(((index) * (3 * scale)) + (2 + (k * 3)))] = (Math.abs(color.b / 255))
      }
  })

  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(points.length * scale));
  geometry.setAttribute('color', new BufferAttribute(colorsArray, 3));
  const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 20 });
  const line = new THREE.Line(geometry, material);

  return line
}


const tracer2 = (points: any, colors: any): Line =>  {
  
  // console.log('points: ', points.length)

  const colorsArray = new Float32Array(colors.length * 3);
  const _colorsArray = new Float32Array((colors.length * 10) * 3);
  colors.forEach((color: any, index: number) => {
    colorsArray[index * 3 + 0] = (Math.abs(color.r / 255));
    colorsArray[index * 3 + 1] = (Math.abs(color.g / 255));
    colorsArray[index * 3 + 2] = (Math.abs(color.b / 255));
  });
  // console.log(colorsArray)
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(points.length * 1));
  geometry.setAttribute('color', new BufferAttribute(colorsArray, 3));
  const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 20 });
  const line = new THREE.Line(geometry, material);

  return line
}


export {trace, tracer}