const heightMapUrl = require('./sion_2.png')
// const normalMapUrl = require('./NormalMap.png')
let heightMap = null
// let normalMap = null
// let p = null
// let lp = null
// let v = [0, 0]
let init = true

export function slope (p5) {
  p5.preload = function () {
    // Load height map
    heightMap = p5.loadImage(heightMapUrl)
    // normalMap = p5.loadImage(normalMapUrl)
  }

  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
    p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    if (!heightMap) return
    if (init) {
      p5.background(255)
      p5.image(heightMap, 0, 0, p5.width, p5.width)
      p5.loadPixels()
      // p5.image(normalMap, 0, 0, p5.width, p5.width)
      // console.log(getPixel(300, 300))
      init = false
    }

    p5.image(heightMap, 0, 0, p5.width, p5.width)
    // if (p5.mouseIsPressed) {
    //   p = [p5.mouseX, p5.mouseY]
    // }

    // if (p) {
    //   // console.log(p)
    //   const { dx, dy } = getGradientVector(p[0], p[1])
    //   v[0] += dx * 1
    //   v[1] += dy * 1
    //   v[0] *= 0.4
    //   v[1] *= 0.4
    //   p5.stroke(255)
    //   p5.line(p[0], p[1], p[0] - v[0], p[1] - v[1])
    //   p[0] -= v[0]
    //   p[1] -= v[1]
    // }

    // const d = getPixel(p.x, p.y)
    // v.add((p5.createVector(d.g, d.r)))
    // v.normalize()
    // const nP = p.copy().sub(v)
    // p5.line(p.x, p.y, nP.x, nP.y)
    // p = nP

    p5.background(0)

    const { width } = p5
    const gridSize = 50
    const step = (width / gridSize)
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let x = i * step + Math.random() * 10
        let y = j * step + Math.random() * 10

        for (let k = 0; k < 20; k++) {
          const gradientVector = getGradientVector(x, y)
          // const brightness = getPixelBrightness(x, y)
          const { dx, dy } = gradientVector
          const steepness = p5.createVector(dx, dy).mag()

          const nX = x + dx * 2
          const nY = y + dy * 2

          p5.stroke(255, 255, 255, steepness * 50)
          // p5.stroke(255, 255, 255)
          p5.line(x, y, nX, nY)
          x = nX
          y = nY
        }

        // p5.fill(steepness * 100, 0, 0, steepness * 100)
        // p5.ellipse(x, y, 4, 4)
      }
    }
  }

  p5.mouseClick = function () {
    console.log('sdjh')
  }

  function getPixel (x, y) {
    const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
    const r = p5.pixels[pixelIndex + 0]
    const g = p5.pixels[pixelIndex + 1]
    const b = p5.pixels[pixelIndex + 2]
    const a = p5.pixels[pixelIndex + 3]
    return { r, g, b, a }
  }

  function getPixelBrightness (x, y) {
    const { r, g, b } = getPixel(x, y)
    return (r + g + b) / 3
  }

  function getGradientVector (x, y) {
    const height = getPixelBrightness(x, y)

    const dx = getPixelBrightness(x + 3, y) - height
    const dy = getPixelBrightness(x, y + 3) - height

    return { dx, dy }
  }
}
