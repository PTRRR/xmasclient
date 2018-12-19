export function vertex (p5) {
  const vertex = p5.vertex

  p5.vertex = function (x, y) {
    const state = p5.gcode.getState()
    if (state.beginShape) {
      this.gcode.addCommand('G0', { x: x, y: y })
      this.gcode.addCommand('G11')
      state.beginShape = false
    } else {
      this.gcode.addCommand('G1', { x: x, y: y })
    }
    return vertex.apply(this, arguments)
  }
}
