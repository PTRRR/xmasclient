export function rect (p5) {
  const rect = p5.rect

  p5.rect = function (x, y, w, h) {
    let offsetX = 0
    let offsetY = 0

    switch (this.gcode.rectMode) {
      case 'center':
        offsetX = -w * 0.5
        offsetY = -h * 0.5
        break
    }

    this.gcode
      .addCommand('G1', { x: x + offsetX, y: y + offsetY })
      .addCommand('G11')
      .addCommand('G1', { x: x + w + offsetX, y: y + offsetY })
      .addCommand('G1', { x: x + w + offsetX, y: y + h + offsetY })
      .addCommand('G1', { x: x + offsetX, y: y + h + offsetY })
      .addCommand('G1', { x: x + offsetX, y: y + offsetY })
      .addCommand('G10')
    return rect.apply(this, arguments)
  }
}
