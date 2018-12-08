export function quad (p5) {
  const quad = p5.quad

  p5.quad = function (x1, y1, x2, y2, x3, y3, x4, y4) {
    const { path } = this.gcode
    path.push({ X: x1, Y: y1, Z: 0 })
    path.push({ X: x2, Y: y2, Z: 1 })
    path.push({ X: x3, Y: y3, Z: 1 })
    path.push({ X: x4, Y: y4, Z: 1 })
    path.push({ X: x1, Y: y1, Z: 1 })
    return quad.apply(this, arguments)
  }
}
