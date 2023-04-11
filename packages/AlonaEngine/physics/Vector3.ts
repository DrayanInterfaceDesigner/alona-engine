class Vector3 {
    public x: number = 0
    public y: number = 0
    public z: number = 0
    
    constructor(x?: number, y?: number, z?: number) {
        this.x = x ? x : this.x
        this.y = y ? y : this.y
        this.z = z ? z : this.z
    }
    
    ZERO() {
        this.x = 0, this.y = 0, this.z = 0
        return this
    }
    
    add(v: Vector3) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
    }
    
    sub(v: Vector3) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
    }
    
    scale(s: number) {
        return new Vector3(this.x * s, this.y * s, this.z * s)
    }
    
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    
    normalize() {
        return this.scale(1 / this.length())
    }
    
    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }
    
    cross(v: Vector3) {
        return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x)
    }

    angle() {
        return Math.atan2(this.x, this.y)
    }
    
    angleTo(v: Vector3) {
        return Math.acos(this.dot(v) / (this.length() * v.length()))
    }
    
    rotate(a: number) {
        return new Vector3(this.x * Math.cos(a) - this.y * Math.sin(a), this.x * Math.sin(a) + this.y * Math.cos(a), this.z)
    }
    
    rotateX(a: number) {
        return new Vector3(this.x * Math.cos(a), this.y * Math.sin(a), this.z)
    }
    
    rotateY(a: number) {
        return new Vector3(this.y * Math.cos(a), this.x * Math.sin(a), this.z)
    }
    
    rotateZ(a: number) {
        return new Vector3(this.z * Math.cos(a), this.x * Math.sin(a), this.y * Math.sin(a))
    }
    
    rotateAxis(axis: Vector3, a: number) {
        return new Vector3(axis.x * Math.cos(a) - axis.y * Math.sin(a), axis.x * Math.sin(a) + axis.y * Math.cos(a), axis.z)
    }
    
    rotateAxisX(axis: Vector3, a: number) {
        return new Vector3(axis.x * Math.cos(a), axis.y * Math.sin(a), axis.z)
    }
    
    rotateAxisY(axis: Vector3, a: number) {
        return new Vector3(axis.y * Math.cos(a), axis.x * Math.sin(a), axis.z)
    }
    
    rotateAxisZ(axis: Vector3, a: number) {
        return new Vector3(axis.z * Math.cos(a), axis.x * Math.sin(a), axis.y * Math.sin(a))
    }
    
    getAllVertexes() {
        return [this.x, this.y, this.z]
    }
}

export default Vector3