/* eslint-disable */

import { createCanvas } from '../utils'
import SimplexNoise from 'simplex-noise'

let width = null

export function spheres (p5) {
  let amount = 110
  let amp = 5
  let targetNoiseSize = 0.01
  let feve = 0
  var simplex = new SimplexNoise(Math.random())
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
    // p5.noLoop()
  }

  p5.draw = function () {
    // Clear axidraw path
    p5.background(255)
    p5.noFill()

    const cx = p5.width * 0.5
    const cy = p5.height * 0.5

    const steps = 200
    const radius = p5.height * 0.4

    // Sphere 1
    // for (let i = 0; i < steps; i++) {
    //   const angle = (i / steps) * 2 * Math.PI
    //   const x = Math.cos(angle) * radius + cx
    //   const y = Math.sin(angle) * radius + cy
    //   if (i % 2 === 0) {
    //     p5.line(x, y, cx, cy)
    //   } else {
    //     p5.line(cx, cy, x, y)
    //   }
    // }

    // const amount = 40
    // for (let i = 0; i < amount; i++) {
    //   const r = (1 - Math.pow((i / amount), 2)) * radius
    //   p5.ellipse(cx, cy, r * 2, r * 2)
    // }

    // Sphere 2
    // for (let i = 0; i < steps; i++) {
    //   const rx = (1 - Math.pow(i / steps, 2)) * radius
    //   p5.ellipse(cx, cy, radius, rx)
    // }

    // p5.ellipse(cx, cy, radius, 0)

    // Sphere 2
    // const amount = 10
    // for (let i = 0; i < amount; i++) {
    //   const ry = (i / amount) * radius
    //   for (let j = 0; j < steps + 1; j++) {
    //     const a = (j / steps) * 2 * Math.PI
    //     const x = Math.cos(a) * radius + cx
    //     const y = Math.sin(a) * radius + cy

    //     if (j > 0) {
    //       const la = ((j - 1) / steps) * 2 * Math.PI
    //       const lx = Math.cos(la) * radius + cx
    //       const ly = Math.sin(la) * ry + cy

    //       p5.stroke(0)
    //       p5.line(lx, ly, x, y)
    //     }
    //   }
    // }

    // Sphere 3
    // const maxRadius = 300
    // const pointAmount = 30000
    // const points = []
    // const c = p5.createVector(cx, cy)

    // for (let i = 0; i < pointAmount; i++) {
    //   const a = Math.random() * 2 * Math.PI
    //   const r = Math.random() * maxRadius
    //   const x = Math.cos(a) * r + cx
    //   const y = Math.sin(a) * r + cy
    //   points.push(p5.createVector(x, y))
    // }

    // points.sort((a, b) => {
    //   const distA = c.dist(a)
    //   const distB = c.dist(b)
    //   return distA > distB
    // })

    // points.splice(0, 1000)

    // for (let i = 0; i < points.length; i++) {
    //   const point = points[i]
    //   p5.ellipse(point.x, point.y, 2, 2)
    // }

    // Sphere 4
    // const amount = 100
    // for (let i = 0; i < amount + 1; i++) {
    //   const ry = (i / amount) * radius
    //   for (let j = 0; j < steps + 1; j++) {
    //     const a = (j / steps) * 2 * Math.PI
    //     const x = Math.cos(a) * radius + cx
    //     const y = Math.sin(a) * ry + cy
    //     const n = simplex.noise2D(x, y) * 10

    //     if (j > 0) {
    //       const la = ((j - 1) / steps) * 2 * Math.PI
    //       const lx = Math.cos(la) * radius + cx
    //       const ly = Math.sin(la) * ry + cy
    //       const ln = simplex.noise2D(x, y) * 10

    //       p5.stroke(0)
    //       p5.line(lx, ly + ln, x, y + n)
    //     }
    //   }
    // }

    // Sphere 5
    // const amount = 100
    // for (let i = 0; i < amount + 1; i++) {
    //   const ry = (i / amount) * radius
    //   for (let j = 0; j < steps + 1; j++) {
    //     const a = (j / steps) * 2 * Math.PI
    //     const x = Math.cos(a) * radius + cx
    //     const y = Math.sin(a) * ry + cy
    //     const d = p5.createVector(x, y).dist(p5.createVector(200, 200))
    //     const n = simplex.noise2D(x, y) * 5 * Math.pow(d * 0.03, 2) * 0.05

    //     if (j > 0) {
    //       const la = ((j - 1) / steps) * 2 * Math.PI
    //       const lx = Math.cos(la) * radius + cx
    //       const ly = Math.sin(la) * ry + cy
    //       const ld = p5.createVector(lx, ly).dist(p5.createVector(200, 200))
    //       const ln = simplex.noise2D(lx, ly) * 5 * Math.pow(d * 0.03, 2) * 0.05

    //       p5.stroke(0)
    //       p5.line(lx, ly + ln, x, y + n)
    //     }
    //   }
    // }

    // Sphere 6
    for (let i = 0; i < amount + 1 - Math.round((width / 100) * amount); i++) {
      const ry = (i / amount) * radius
      const noiseSize = (feve - (i / amount)) * targetNoiseSize
      for (let j = 0; j < steps + 1; j++) {
        const a = (j / steps) * 2 * Math.PI
        const x = Math.cos(a) * radius + radius * 1.4
        const y = Math.sin(a) * ry + cy
        const n = simplex.noise2D(x * noiseSize, y * noiseSize) * amp

        if (j > 0) {
          const la = ((j - 1) / steps) * 2 * Math.PI
          const lx = Math.cos(la) * radius + radius * 1.4
          const ly = Math.sin(la) * ry + cy
          const ln = simplex.noise2D(lx * noiseSize, ly * noiseSize) * amp

          p5.stroke(0)

          if (j === 1) {
            p5.line(lx, ly, x, y + n)
          } else if (j === steps) {
            p5.line(lx, ly + ln, x, y)
          } else {
            p5.line(lx, ly + ln, x, y + n)
          }
        }
      }
    }

    // for (let i = 0; i < amount + 1; i++) {
    //   const ry = (i / amount) * radius
    //   const noiseSize = (1 - (i / amount)) * targetNoiseSize
    //   for (let j = 0; j < steps + 1; j++) {
    //     const a = (j / steps) * 2 * Math.PI
    //     const x = Math.cos(a) * ry + cx
    //     const y = Math.sin(a) * radius + cy
    //     const n = simplex.noise2D(x * noiseSize, y * noiseSize) * amp

    //     if (j > 0) {
    //       const la = ((j - 1) / steps) * 2 * Math.PI
    //       const lx = Math.cos(la) * ry + cx
    //       const ly = Math.sin(la) * radius + cy
    //       const ln = simplex.noise2D(lx * noiseSize, ly * noiseSize) * amp

    //       p5.stroke(0)
    //       p5.line(lx, ly + ln, x, y + n)
    //     }
    //   }
    // }
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Width',
        min: 0,
        max: 100
      },
      onValue: value => {
        width = value
        p5.draw()
      }
    },
    {
      type: 'Slider',
      attr: {
        value: 'Feve Morph',
        min: 0,
        max: 100
      },
      onValue: value => {
        feve = value / 100
        p5.draw()
      }
    },
    {
      type: 'Slider',
      attr: {
        value: 'Amplitude',
        min: 0,
        max: 30
      },
      onValue: value => {
        amp = value
        p5.draw()
      }
    },
    {
      type: 'Slider',
      attr: {
        value: 'Noise Size',
        min: 0,
        max: 100
      },
      onValue: value => {
        targetNoiseSize = value / 10000
        p5.draw()
      }
    },
    {
      type: 'Slider',
      attr: {
        value: 'Amount',
        min: 0,
        max: 200
      },
      onValue: value => {
        amount = value
        p5.draw()
      }
    },
    {
      type: 'Button',
      attr: {
        value: 'Seed'
      },
      onValue: value => {
        simplex = new SimplexNoise(Math.random())
        p5.draw()
      }
    }
  ]
}
