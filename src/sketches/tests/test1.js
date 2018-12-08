import { createCanvas } from '../utils'

export function test1 (p5) {
  p5.setup = function () {
    createCanvas(p5)
    p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    // const offset = 200
    // p5.rect(offset, offset, p5.width - offset * 2, p5.height - offset * 2)
    // p5.ellipse(p5.width * 0.5, p5.height * 0.5, p5.height * 0.9, p5.height * 0.9)
  }

  p5.mouseClick = function () { }
}
