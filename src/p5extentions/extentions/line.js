export function line (p5) {
  const line = p5.line

  p5.line = function (x1, y1, x2, y2) {
    this.gcode
      .addCommand('G0', { x: x1, y: y1 })
      .addCommand('G11')
      .addCommand('G1', { x: x2, y: y2 })
      .addCommand('G10')
    return line.apply(this, arguments)
  }
}
