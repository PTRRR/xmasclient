export function rectMode (p5) {
  const rectMode = p5.rectMode

  p5.rectMode = function (mode) {
    this.gcode.rectMode = mode
    return rectMode.apply(this, arguments)
  }
}
