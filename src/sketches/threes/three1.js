import { createCanvas } from '../utils'

export function three1 (p5) {
  p5.setup = function () {
    createCanvas(p5)
    // p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    const iterations = 100
    let rX = 10
    let stepX = 0.04
    // let step2X =
    let rY = 10
    let posX = p5.width * 0.5
    let posY = 50
    const stepY = 0.12

    for (let i = 0; i < iterations; i++) {
      const steps = 50
      for (let j = 0; j < steps; j++) {
        const angle = j / steps * Math.PI * 2
        const x = Math.cos(angle) * rX + posX
        const y = Math.sin(angle) * rY + posY

        const nextAngle = (j + 1) / steps * Math.PI * 2
        const nextX = Math.cos(nextAngle) * (rX + stepX) + posX
        const nextY = Math.sin(nextAngle) * rY + posY + stepY

        posY += stepY
        rX += stepX

        p5.line(x, y, nextX, nextY)
      }
    }
  }
}
