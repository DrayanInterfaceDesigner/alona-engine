import Vector3 from "../physics/Vector3"
import {lerp, ab_distance, ab_direction, rad2deg} from "../arithmetic/Arithmetic"


const hsv_to_rgb = (h: number, s: number, v: number): any => {
    
    // alert(h)
    s = s >= 0 || s <= 1 ? s : s / 100
    v = v >= 0 || v <= 1? v : v / 100
    let 
    r: number, 
    g: number, 
    b: number, 
    i: number, 
    f: number, 
    p: number, 
    q: number, 
    t: number,
    rgb: any

    if (s === 0) {
      // Achromatic (gray)
      r = g = b = v
      rgb = {
        r: r,
        g: g,
        b: b
      }
      return rgb
    }

    h /= 15 // sector 0 to 5
    i = Math.floor(h)
    // console.log(h, i , f, p ,q, t)
    f = h - i // factorial part of h
    p = v * (1 - s)
    q = v * (1 - s * f)
    t = v * (1 - s * (1 - f))

    switch (i) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      default:// case 5:
        r = v
        g = p
        b = q

        // alert("Invalid")
        // alert("Invalid" )
        break
    }
    rgb = {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
    console.log(rgb)
    if(rgb.r == 255  && rgb.b == 255) {
      rgb = {r: 0, g: 0, b: 0}
    }

    return rgb

}
let i = .1
const hsv_by_distance = (vector3: Vector3, origin?: Vector3): any => {
    origin = origin ? origin : new Vector3().ZERO()
    // const DIRECTION_AS_H = 90
    // const DIRECTION_AS_H = ab_direction(origin, vector3)
    // const DIRECTION_AS_H = ab_direction(origin, vector3).angle()
    // const DISTANCE_AS_SV = (ab_distance(origin, vector3) / 10)
    // const DISTANCE_AS_V = (ab_distance(origin, vector3) / 10)

    // const hsv = {
    //     h: DIRECTION_AS_H,
    //     s: DISTANCE_AS_SV,
    //     v: DISTANCE_AS_V
    // }
  const radius = 6
  const scale = 100
    return {
      r: ((vector3.x / radius + 1) / 2) * scale  ,
      g: ((vector3.y / radius + 1) / 2)*  scale  ,
      b: ((vector3.z / radius + 1) / 2)*  scale
    }
}

const lerp_color = (c1:any, c2:any, t:any) => {
  const rgb = {
    r: lerp(c1.r, c2.r, t) % 255,
    g: lerp(c1.g, c2.g, t) % 255,
    b: lerp(c1.b, c2.b, t) % 255,
  }
  return rgb
} 

export {
    hsv_to_rgb,
    hsv_by_distance,
    lerp_color
}