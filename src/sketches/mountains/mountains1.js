// import SimplexNoise from 'simplex-noise'
import { createCanvas } from '../utils'
// const imgUrl = require('./valais.png')
const foulyUrl = require('./fouly_1.png')

// const simplex = new SimplexNoise()
let img = null

export function mountains1 (p5) {
  p5.preload = function () {
    img = p5.loadImage(foulyUrl)
  }

  p5.setup = function () {
    createCanvas(p5)
    p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    const offset = 100
    p5.translate(p5.width * 0.5 - 110, p5.height * 0.5)
    p5.rotate(Math.PI * 0.5)
    p5.imageMode(p5.CENTER)
    p5.image(img, 0, 0, p5.height - offset, p5.height - offset)
    p5.rotate(-Math.PI * 0.5)
    p5.translate(-p5.width * 0.5 + 110, -p5.height * 0.5)
    p5.loadPixels()
    p5.background(255)
    p5.noFill()
    // p5.rect(offset * 0.5, offset * 0.5, p5.width - offset - 1, p5.height - offset - 1)

    const amount = 400
    const steps = 200
    const stepY = p5.height / steps
    const stepX = p5.width / amount

    for (let i = 0; i < amount; i++) {
      const x = i * stepX
      for (let j = 0; j < steps + 1; j++) {
        const ly = j * stepY
        const y = (j + 1) * stepY

        const lpixelIndex = (Math.floor(ly) * p5.width + Math.floor(x)) * 4
        const lr = p5.pixels[lpixelIndex + 0]
        const lg = p5.pixels[lpixelIndex + 1]
        const lb = p5.pixels[lpixelIndex + 2]
        const lbr = 1 - (((lr + lg + lb) / 3) / 255)

        const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
        const r = p5.pixels[pixelIndex + 0]
        const g = p5.pixels[pixelIndex + 1]
        const b = p5.pixels[pixelIndex + 2]
        const br = 1 - (((r + g + b) / 3) / 255)
        // p5.ellipse(x, y, 20, 20)
        const a = 150
        const offset = 200
        if (br > 0 && lbr > 0) {
          p5.line(x + lbr * a - offset, ly, x + (br * a || 0) - offset, y)
        }
      }
    }
  }
}
