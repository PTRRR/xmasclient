import SimplexNoise from 'simplex-noise'
// const imgUrl = require('./serveimage.png')
const imgUrl = require('./valais.png')

const simplex = new SimplexNoise()
let img = null
export function spirale (p5) {
  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
    p5.noLoop()
  }

  p5.draw = function () {
    // console.log('skjlh')
    p5.background(255)
    const steps = 40
    let radius = 400
    let radiusStep = 0.1
    p5.stroke(0)
    for (let i = 0; i < 5000; i++) {
      const angle = i % steps / steps * Math.PI * 2
      const nextAngle = (i + 1) % steps / steps * Math.PI * 2
      let x = Math.cos(angle) * (radius) + p5.width * 0.5
      let y = Math.sin(angle) * (radius) + p5.height * 0.5
      let nx = Math.cos(nextAngle) * (radius + radiusStep) + p5.width * 0.5
      let ny = Math.sin(nextAngle) * (radius + radiusStep) + p5.height * 0.5

      const b = simplex.noise2D(x * 0.005, y * 0.005) * 20
      const nb = simplex.noise2D(nx * 0.005, ny * 0.005) * 20

      // x = Math.cos(angle) * (radius + b) + p5.width * 0.5
      // y = Math.sin(angle) * (radius + b) + p5.height * 0.5
      // nx = Math.cos(nextAngle) * (radius + radiusStep + nb) + p5.width * 0.5
      // ny = Math.sin(nextAngle) * (radius + radiusStep + nb) + p5.height * 0.5

      radius += radiusStep
      // radiusStep -= 0.0002
      p5.line(x + b, y, nx + nb, ny)
    }
  }
}

export function spirale2 (p5) {
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
    // console.log('skjlh')
    p5.image(img, (p5.width - p5.height) * 0.5, (0) * 0.5, p5.height, p5.height)
    p5.loadPixels()
    p5.background(255)
    let steps = 150
    let radius = 0
    let radiusStep = 0.06
    p5.stroke(0)
    for (let i = 0; i < 10000; i++) {
      const angle = i % steps / steps * Math.PI * 2
      const nextAngle = (i + 1) % steps / steps * Math.PI * 2
      let x = Math.cos(angle) * (radius) + p5.width * 0.5
      let y = Math.sin(angle) * (radius) + p5.height * 0.5
      let nx = Math.cos(nextAngle) * (radius + radiusStep) + p5.width * 0.5
      let ny = Math.sin(nextAngle) * (radius + radiusStep) + p5.height * 0.5

      const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
      const r = p5.pixels[pixelIndex + 0]
      const g = p5.pixels[pixelIndex + 1]
      const b = p5.pixels[pixelIndex + 2]
      const br = Math.pow(1 - (((r + g + b) / 3) / 255), 2)

      const npixelIndex = (Math.floor(ny) * p5.width + Math.floor(nx)) * 4
      const nr = p5.pixels[npixelIndex + 0]
      const ng = p5.pixels[npixelIndex + 1]
      const nb = p5.pixels[npixelIndex + 2]
      const nbr = Math.pow(1 - (((nr + ng + nb) / 3) / 255), 2)

      // const sb = simplex.noise2D(x, y) * 10
      // const nsb = simplex.noise2D(nx, ny) * 10

      // x = Math.cos(angle) * (radius + b) + p5.width * 0.5
      // y = Math.sin(angle) * (radius + b) + p5.height * 0.5
      // nx = Math.cos(nextAngle) * (radius + radiusStep + nb) + p5.width * 0.5
      // ny = Math.sin(nextAngle) * (radius + radiusStep + nb) + p5.height * 0.5

      radius += radiusStep
      // steps++
      // radiusStep -= 0.0002
      p5.line(x, y - br * 90, nx, ny - nbr * 90)
    }
  }
}
