import { createCanvas } from '../utils'

export function three2 (p5) {
  p5.setup = function () {
    createCanvas(p5)
    // p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    const iterations = 115
    let rX = 10
    let stepX = 0.15
    // let step2X =
    let rY = 10
    let posX = p5.width * 0.9
    let posY = -40
    const stepY = 0.12

    // const offset = 30

    let inter = 50
    let reset = 10
    // p5.rect(offset, offset, p5.width - 2 * offset, p5.height - 2 * offset)

    for (let i = 0; i < iterations; i++) {
      const steps = 50
      // console.log(i % 30)
      if (i % inter === inter - 1) {
        reset += 180
        rX = reset
      }

      for (let j = 0; j < steps + 1; j++) {
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

export function three3 (p5) {
  p5.setup = function () {
    createCanvas(p5)
    // p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    const iterations = 200
    let rX = 10
    let stepX = 0.10
    // let step2X =
    let rY = 10
    let posX = p5.width * 0.5
    let posY = -40
    const stepY = 0.08

    // const offset = 30

    let inter = 50
    let reset = 10
    // p5.rect(offset, offset, p5.width - 2 * offset, p5.height - 2 * offset)

    for (let i = 0; i < iterations; i++) {
      const steps = 50
      // console.log(i % 30)
      if (i % inter === inter - 1) {
        reset += 100
        rX = reset
      }

      for (let j = 0; j < steps + 1; j++) {
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
