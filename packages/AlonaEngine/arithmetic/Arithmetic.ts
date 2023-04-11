import Vector3 from '../physics/Vector3'

const rad2deg = (rad: number) => {
    return rad * (180 / Math.PI)
}

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
}

const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t
}

const ab_direction = (a: Vector3, b: Vector3) => {
    const x1: number = Math.abs(a.x)
    const y1: number = Math.abs(a.y)
    const z1: number = Math.abs(a.z)
    const x2: number = Math.abs(b.x)
    const y2: number = Math.abs(b.y)
    const z2: number = Math.abs(b.z)
    const x:  number = Math.max(x2, x1) - Math.min(x2, x1)
    const y:  number = Math.max(y2, y1) - Math.min(y2, y1)
    const z:  number = Math.max(z2, z1) - Math.min(z2, z1)
    return new Vector3(x, y, z)
}

const ab_distance = (a: Vector3, b: Vector3) => {
    const dif: Vector3 = ab_direction(a, b)
    const magnitude: number = Math.pow(dif.x, 2) + Math.pow(dif.y, 2) + Math.pow(dif.z, 2)
    return Math.sqrt(magnitude)
}


export {
    rad2deg,
    deg2rad,
    lerp,
    ab_direction,
    ab_distance
}


