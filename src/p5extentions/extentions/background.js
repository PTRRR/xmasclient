export function background (p5) {
  const background = p5.background

  p5.background = function (r, g, b, a) {
    p5.gcode.clear()
    return background.apply(this, arguments)
  }
}
