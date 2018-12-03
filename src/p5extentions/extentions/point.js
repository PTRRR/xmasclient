export function point (p5) {
  const point = p5.point

  p5.point = function (x, y) {
    const { path } = this.gcode
    path.push({ X: x, Y: y, Z: 1 })
    path.push({ X: x, Y: y, Z: 1 })
    return point.apply(this, arguments)
  }
}
