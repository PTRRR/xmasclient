// import SimplexNoise from 'simplex-noise'
// const imgUrl = require('./serveimage.png')
const imgUrl = require('./valais.png')

// const simplex = new SimplexNoise()
let img = null

const size = 200
const grid = []
const noiseGrid = []
let init = true
let lastPos = null
let pos = null

export function maze3 (p5) {
  p5.preload = function () {
    img = p5.loadImage(imgUrl)
  }

  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
    p5.pixelDensity(1)
    // p5.noLoop()

    pos = p5.createVector(0, 0)
    lastPos = pos.copy()

    for (let i = 0; i < size; i++) {
      const x = i / size * p5.height
      for (let j = 0; j < size; j++) {
        const y = j / size * p5.height
        grid.push(p5.createVector(x, y))
      }
    }
  }

  p5.draw = function () {
    // console.log('skjlh')
    if (init) {
      p5.image(img, 0, (0) * 0.5, p5.height, p5.height)
      p5.loadPixels()
      // p5.background(255)
      p5.stroke(0)

      for (let i = 0; i < grid.length; i++) {
        const x = grid[i].x
        const y = grid[i].y
        const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
        const r = p5.pixels[pixelIndex + 0]
        const g = p5.pixels[pixelIndex + 1]
        const b = p5.pixels[pixelIndex + 2]
        const br = Math.pow(1 - (((r + g + b) / 3) / 255), 2) * 10

        noiseGrid.push(p5.createVector(x + br, y + br))
      }
      init = false
    } else {
      grow()
      grow()
      grow()
      grow()
    }

    // for (let i = 0; i < 10000; i++) {
    //   const angle = i % steps / steps * Math.PI * 2
    //   const nextAngle = (i + 1) % steps / steps * Math.PI * 2
    //   let x = Math.cos(angle) * (radius) + p5.width * 0.5
    //   let y = Math.sin(angle) * (radius) + p5.height * 0.5
    //   let nx = Math.cos(nextAngle) * (radius + radiusStep) + p5.width * 0.5
    //   let ny = Math.sin(nextAngle) * (radius + radiusStep) + p5.height * 0.5

    //   const pixelIndex = (Math.floor(y) * p5.width + Math.floor(x)) * 4
    //   const r = p5.pixels[pixelIndex + 0]
    //   const g = p5.pixels[pixelIndex + 1]
    //   const b = p5.pixels[pixelIndex + 2]
    //   const br = Math.pow(1 - (((r + g + b) / 3) / 255), 2)

    //   const npixelIndex = (Math.floor(ny) * p5.width + Math.floor(nx)) * 4
    //   const nr = p5.pixels[npixelIndex + 0]
    //   const ng = p5.pixels[npixelIndex + 1]
    //   const nb = p5.pixels[npixelIndex + 2]
    //   const nbr = Math.pow(1 - (((nr + ng + nb) / 3) / 255), 2)

    //   const sb = simplex.noise2D(x, y) * 10
    //   const nsb = simplex.noise2D(nx, ny) * 10

    //   // x = Math.cos(angle) * (radius + b) + p5.width * 0.5
    //   // y = Math.sin(angle) * (radius + b) + p5.height * 0.5
    //   // nx = Math.cos(nextAngle) * (radius + radiusStep + nb) + p5.width * 0.5
    //   // ny = Math.sin(nextAngle) * (radius + radiusStep + nb) + p5.height * 0.5

    //   radius += radiusStep
    //   // steps++
    //   // radiusStep -= 0.0002
    //   p5.line(x, y - br * 90, nx, ny - nbr * 90)
    // }
  }

  function grow () {
    let closest = Infinity
    let closestIndex = null

    for (let i = 0; i < noiseGrid.length; i++) {
      const dist = pos.dist(noiseGrid[i])
      if (dist < closest) {
        closest = dist
        closestIndex = i
      }
    }

    pos = grid[closestIndex]
    p5.stroke(255, 0, 0)

    if (lastPos.dist(pos) < 10) {
      p5.line(lastPos.x, lastPos.y, pos.x, pos.y)
    }

    grid.splice(closestIndex, 1)
    noiseGrid.splice(closestIndex, 1)
    lastPos = pos.copy()
  }
}
