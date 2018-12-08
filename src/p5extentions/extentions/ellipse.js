export function ellipse (p5) {
  const ellipse = p5.ellipse

  p5.ellipse = function (x, y, xd, yd) {
    const steps = 100
    for (let i = 0; i < steps + 1; i++) {
      const angle = (i / steps) * 2 * Math.PI
      const xC = Math.cos(angle) * (xd * 0.5) + x
      const yC = Math.sin(angle) * (yd * 0.5) + y

      if (i === 0) {
        this.gcode.addCommand('G0', { x: xC, y: yC }).addCommand('G11')
      } else {
        this.gcode.addCommand('G1', { x: xC, y: yC })
      }
    }
    this.gcode.addCommand('G10')
    return ellipse.apply(this, arguments)
  }
}
