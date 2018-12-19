export function endShape (p5) {
  const endShape = p5.endShape

  p5.endShape = function () {
    const state = p5.gcode.getState()
    state.beginShape = false
    this.gcode.addCommand('G10')
    return endShape.apply(this, arguments)
  }
}
