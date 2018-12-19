import { createCanvas } from '../utils'

// eslint-disable-next-line
export function circle_1 (p5) {
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
  }

  p5.draw = function () {
    const amount = 60
    const maxRadius = p5.height * 0.4
    for (let i = 1; i < amount; i++) {
      const percent = i / amount
      const radius = (1 - Math.pow(percent, 3)) * maxRadius
      p5.ellipse(maxRadius + p5.width * 0.15, p5.height * 0.5, radius * 2, radius * 2)
    }
  }
}
