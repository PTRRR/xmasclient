export function triangle (p5) {
  const triangle = p5.triangle

  p5.triangle = function (x1, y1, x2, y2, x3, y3) {
    const { path } = this.gcode
    path.push({ X: x1, Y: y1, Z: 0 })
    path.push({ X: x2, Y: y2, Z: 1 })
    path.push({ X: x3, Y: y3, Z: 1 })
    path.push({ X: x1, Y: y1, Z: 1 })
    return triangle.apply(this, arguments)
  }
}
