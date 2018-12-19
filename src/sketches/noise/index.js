import { createCanvas } from '../utils'
import SimplexNoise from 'simplex-noise'

// eslint-disable-next-line
export function noise (p5) {
  let steps = 50
  let amount = 40
  let displacement = 40

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
            const x = Math.cos(angle) * radius * percent + cX - (cX - radius) * 0.4
            const y = Math.sin(angle) * radius + cY
            const noise = simplex.noise2D(x * 0.006, y * 0.006) * displacement * (1 - percent)
            p5.vertex(x + noise, y)
          }
        } else {
          const angle = (j / steps) * Math.PI * 2
          const x = Math.cos(angle) * radius * percent + cX - (cX - radius) * 0.4
          const y = Math.sin(angle) * radius + cY
          const noise = simplex.noise2D(x * 0.006, y * 0.006) * displacement * (1 - percent)
          p5.vertex(x + noise, y)
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
        max: 120
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
        max: 60
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
        max: 200
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
