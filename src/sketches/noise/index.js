import { createCanvas } from '../utils'
import SimplexNoise from 'simplex-noise'

// eslint-disable-next-line
export function noise (p5) {
  let steps = 200
  let amount = 60
  let displacement = 60

  let simplex = new SimplexNoise(Math.random())
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
  }

  p5.draw = function () {
    p5.background(255)
    const cX = p5.width * 0.5
    const cY = p5.height * 0.5
    const radius = p5.height * 0.4
    for (let i = 0; i < amount + 1; i++) {
      const percent = i / amount
      p5.beginShape()
      for (let j = 0; j < steps + 1; j++) {
        if (i === 0) {
          const angle = (j / steps) * Math.PI * 2 + (Math.PI * 0.5)
          if (angle < Math.PI + (Math.PI * 0.5)) {
            const y = Math.cos(angle) * radius * percent + cY
            const x = Math.sin(angle) * radius + cX - (cX * 0.2)
            const noise = simplex.noise2D(x * 0.0045, y * 0.0045) * displacement * (1 - Math.pow(percent, 2) * 1)
            p5.vertex(x, y + noise)
          }
        } else {
          const angle = (j / steps) * Math.PI * 2
          const y = Math.cos(angle) * radius * percent + cY
          const x = Math.sin(angle) * radius + cX - (cX * 0.2)
          const noise = simplex.noise2D(x * 0.0045, y * 0.0045) * displacement * (1 - Math.pow(percent, 2) * 1)
          p5.vertex(x, y + noise)
        }
      }
      p5.endShape()
    }
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Steps',
        min: 3,
        max: 300
      },

      onValue: value => {
        steps = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Amount',
        min: 1,
        max: 120
      },

      onValue: value => {
        amount = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Displacement',
        min: 20,
        max: 400
      },

      onValue: value => {
        // maxRadiusX = p5.height * (value / 100)
        displacement = value
        p5.draw()
      }
    },

    {
      type: 'Button',
      attr: {
        value: 'Seed'
      },
      onValue: () => {
        simplex = new SimplexNoise(Math.random())
        p5.draw()
      }
    }
  ]
}
