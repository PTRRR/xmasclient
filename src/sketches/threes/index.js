import { createCanvas } from '../utils'

export function three (p5) {
  let steps = 40
  let amount = 100
  let threshold = 4

  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
  }

  p5.draw = function () {
    p5.background(255)
    const cX = p5.width * 0.5
    // const cY = p5.height * 0.5
    const startRadius = 10
    const endRadius = p5.width * 0.9
    const total = (steps + 1) * (amount + 1)

    p5.beginShape()
    for (let i = 0; i < amount + 1; i++) {
      for (let j = 0; j < steps + 1; j++) {
        const step = i * (steps + 1) + j
        const percent = (step / total)
        const angle = (j / steps) * Math.PI * 2
        const num = total / threshold
        const radius = (endRadius * percent + startRadius) * ((step % num) / num) + startRadius
        const x = Math.cos(angle) * radius + cX
        const y = Math.sin(angle) * (20 * (percent * 0.5) + 10) + p5.height * 0.1
        p5.vertex(x, y + percent * p5.height * 0.80)
      }
    }
    // console.log(step, total)
    p5.endShape()
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Etages',
        min: 1,
        max: 8
      },

      onValue: value => {
        threshold = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Densité',
        min: 20,
        max: 150
      },

      onValue: value => {
        amount = value
        p5.draw()
      }
    }
  ]
}
