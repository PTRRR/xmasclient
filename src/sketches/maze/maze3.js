// import SimplexNoise from 'simplex-noise'
// const imgUrl = require('./serveimage.png')
import { createCanvas } from '../utils'
const imgUrl = require('./valais.png')

// const simplex = new SimplexNoise()
let img = null

const size = 150
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
    createCanvas(p5)
    p5.pixelDensity(1)
    // p5.noLoop()

    pos = p5.createVector(0, 0)
    lastPos = pos.copy()

    for (let i = 0; i < size; i++) {
      const x = i / size * p5.width
      for (let j = 0; j < size; j++) {
        const y = j / size * p5.width
        grid.push(p5.createVector(x, y))
      }
    }
  }

  p5.draw = function () {
    if (init) {
      p5.image(img, 0, 0, p5.width, p5.width)
      p5.loadPixels()
      // p5.background(255)
      p5.stroke(0)

      for (let i = 0; i < grid.length; i++) {
        const x = grid[i].x
        const y = grid[i].y
        const pixelIndex = Math.floor(Math.floor(y) * p5.width + Math.floor(x)) * 4
        const r = p5.pixels[pixelIndex + 0]
        const g = p5.pixels[pixelIndex + 1]
        const b = p5.pixels[pixelIndex + 2]
        const br = Math.pow(1 - (((r + g + b) / 3) / 255), 2) * 10

        // p5.ellipse(x + br, y + br, 5, 5)

        noiseGrid.push(p5.createVector(x + br, y + br))
      }
      init = false
    } else {
      grow()
      grow()
      grow()
      grow()
    }
  }

  function grow () {
    if (noiseGrid.length > 0) {
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

      if (lastPos.dist(pos) < 100) {
        p5.line(lastPos.x, lastPos.y, pos.x, pos.y)
      }

      grid.splice(closestIndex, 1)
      noiseGrid.splice(closestIndex, 1)
      lastPos = pos.copy()
    }
  }
}
