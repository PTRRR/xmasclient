export function gcodeExtentionForP5 (p5) {
  // Add graph to p5
  p5.gcode = {
    path: [],
    params: {
      scaleFactor: 1
    },
    clear: function () {
      this.path = []
    },
    getString: function () {
      const string = []
      const { scaleFactor } = this.params
      for (const [index, cmd] of Object.entries(this.path)) {
        const { X, Y, Z } = cmd
        string.push(
          joinCommand(index, {
            X: X * scaleFactor,
            Y: Y * scaleFactor,
            Z
          })
        )
      }
      return string.join('\n')
    },
    getChunks: function (chunkSize) {
      const { scaleFactor } = this.params
      const chunks = []
      let chunk = []
      for (const [key, cmd] of Object.entries(this.path)) {
        const index = parseInt(key)
        const { X, Y, Z } = cmd
        chunk.push(
          joinCommand(index, {
            X: X * scaleFactor,
            Y: Y * scaleFactor,
            Z
          })
        )
        if (index % chunkSize === chunkSize - 1) {
          chunks.push(chunk.join('\n'))
          chunk = []
        }
      }
      // Add last chunk
      chunks.push(chunk.join('\n'))

      return chunks
    }
  }

  function joinCommand (index, cmd) {
    return `N${index} G0 X${cmd.X} Y${cmd.Y} Z${cmd.Z}`
  }

  // Extend background
  const background = p5.background
  p5.background = function (r, g, b, a) {
    p5.gcode.clear()
    return background.apply(this, arguments)
  }

  // Extend ellipse
  const ellipse = p5.ellipse
  p5.ellipse = function (x, y, xd, yd) {
    const steps = 60
    const { path } = this.gcode
    for (let i = 0; i < steps + 1; i++) {
      const angle = (i / steps) * 2 * Math.PI
      const xC = Math.cos(angle) * (xd * 0.5) + x
      const yC = Math.sin(angle) * (yd * 0.5) + y

      path.push({ X: xC, Y: yC, Z: i > 0 ? 1 : 0 })
    }

    return ellipse.apply(this, arguments)
  }

  // Extend rectMode
  const rectMode = p5.rectMode
  p5.rectMode = function (mode) {
    this.gcode.rectMode = mode
    return rectMode.apply(this, arguments)
  }

  // Extend rect
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

    const { path } = this.gcode
    path.push({ X: x + offsetX, Y: y + offsetY, Z: 0 })
    path.push({ X: x + w + offsetX, Y: y + offsetY, Z: 1 })
    path.push({ X: x + w + offsetX, Y: y + h + offsetY, Z: 1 })
    path.push({ X: x + offsetX, Y: y + h + offsetY, Z: 1 })
    path.push({ X: x + offsetX, Y: y + offsetY, Z: 1 })
    return rect.apply(this, arguments)
  }

  // Extend triangle
  const triangle = p5.triangle
  p5.triangle = function (x1, y1, x2, y2, x3, y3) {
    const { path } = this.gcode
    path.push({ X: x1, Y: y1, Z: 0 })
    path.push({ X: x2, Y: y2, Z: 1 })
    path.push({ X: x3, Y: y3, Z: 1 })
    path.push({ X: x1, Y: y1, Z: 1 })
    return triangle.apply(this, arguments)
  }

  // Extend quad
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

  // Extend line
  const line = p5.line
  p5.line = function (x1, y1, x2, y2) {
    const { path } = this.gcode
    path.push({ X: x1, Y: y1, Z: 0 })
    path.push({ X: x2, Y: y2, Z: 1 })
    return line.apply(this, arguments)
  }

  // Extend point
  const point = p5.point
  p5.point = function (x, y) {
    const { path } = this.gcode
    path.push({ X: x, Y: y, Z: 1 })
    path.push({ X: x, Y: y, Z: 1 })
    return point.apply(this, arguments)
  }
}
