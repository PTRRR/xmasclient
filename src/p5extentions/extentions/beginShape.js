export function beginShape (p5) {
  const beginShape = p5.beginShape

  p5.beginShape = function (kind) {
    const state = p5.gcode.getState()
    state.beginShape = true
    return beginShape.apply(this, arguments)
  }
}
