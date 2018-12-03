// import SimplexNoise from 'simplex-noise'
const imgUrl = require('./serveimage.png')

// const simplex = new SimplexNoise()
let img = null
export function mountains (p5) {
  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
    p5.noLoop()
  }

  p5.draw = function () {
    // console.log('skjlh')
    p5.background(255)

    const amount = 10
    const steps = 10
    const step = p5.height / steps
    for (let i = 0; i < amount; i++) {
      const x = i * 20
      for (let j = 0; j < steps; j++) {
        p5.line(x, j * step, x, (j + 1) * step)
      }
    }
  }
}

export function mountains1 (p5) {
  p5.preload = function () {
    img = p5.loadImage(imgUrl)
  }

  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
    p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    p5.image(img, (p5.width - p5.height) * 0.5, (0) * 0.5, p5.height, p5.height)
    p5.loadPixels()
    p5.background(255)

    const amount = 300
    const steps = 100
    const stepY = p5.height / steps
    const stepX = p5.width / amount

    for (let i = amount * 0.5; i < amount; i++) {
      const x = i * stepX
      for (let j = 0; j < steps; j++) {
        const ly = j * stepY
        const y = (j + 1) * stepY

        const lpixelIndex = (Math.floor(ly) * p5.width + Math.floor(x)) * 4
        const lr = p5.pixels[lpixelIndex + 0]
        const lg = p5.pixels[lpixelIndex + 1]
        const lb = p5.pixels[lpixelIndex + 2]
        const lbr = Math.pow(1 - (((lr + lg + lb) / 3) / 255), 2)

        const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
        const r = p5.pixels[pixelIndex + 0]
        const g = p5.pixels[pixelIndex + 1]
        const b = p5.pixels[pixelIndex + 2]
        const br = Math.pow(1 - (((r + g + b) / 3) / 255), 2)
        // p5.ellipse(x, y, 20, 20)
        const a = 90
        // const offset = 200
        p5.line(x + lbr * a, j * stepY, x + br * (a || 0), (j + 1) * stepY)
        if (br > 0 && lbr > 0) {

          // p5.line(x + lbr * a - offset, ly, x + (br * a || 0) - offset, y)
          // p5.line(x, j * stepY, x, (j + 1) * stepY)
        }
      }
    }
  }
}
