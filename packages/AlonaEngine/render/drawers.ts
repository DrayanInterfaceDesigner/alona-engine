import {
    Line, 
    BufferGeometry, 
    BufferAttribute, 
    LineBasicMaterial} from 'three'
    import * as THREE from 'three';
    import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
    import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
    import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

/** 
 * Traces the path of a given 
 * geometry and gives a color 
 * to each point*/ 
const trace = (points: any, colors: any):Line => {

    // Create a BufferGeometry to hold the line data
    const geometry = new BufferGeometry();

    // Convert the array of points to a Float32Array for use in the BufferGeometry
    const vertices = new Float32Array(points.length * 3);
    points.forEach((point:any , index: number) => {
      vertices[index * 3 + 0] = point.x;
      vertices[index * 3 + 1] = point.y;
      vertices[index * 3 + 2] = point.z;
    });

    // Add the vertices data to the BufferGeometry
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));

    // Convert the array of colors to a Float32Array for use in the BufferGeometry
    const colorsArray = new Float32Array(colors.length * 3);
    colors.forEach((color: any, index: number) => {
      colorsArray[index * 3 + 0] = color.r / 255;
      colorsArray[index * 3 + 1] = color.g / 255;
      colorsArray[index * 3 + 2] = color.b / 255;
    });

    // Add the colors data to the BufferGeometry
    geometry.setAttribute('color', new BufferAttribute(colorsArray, 3));

    // Create a material that uses vertex colors
    const material = new LineBasicMaterial({ vertexColors: true });

    // Create the line object
    const line = new Line(geometry, material);

    return line
}

export {trace}