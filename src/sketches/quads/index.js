import { createCanvas } from '../utils'

export function quads (p5) {
  let amount = 40

  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
  }

  p5.draw = function () {
    p5.background(255)

    const p1 = p5.createVector(p5.width * 0.5 - (250 * Math.random()), p5.height * 0.5 - (250 * Math.random()))
    const p2 = p5.createVector(p5.width * 0.5 + (50 * Math.random()), p5.height * 0.5 - (250 * Math.random()))
    const p3 = p5.createVector(p5.width * 0.5 + (50 * Math.random()), p5.height * 0.5 + (250 * Math.random()))
    const p4 = p5.createVector(p5.width * 0.5 - (250 * Math.random()), p5.height * 0.5 + (250 * Math.random()))

    const d1 = p5.createVector(((Math.random() - 0.5) * 0.1) * 150, ((Math.random() - 0.5) * 0.1) * 150)

    p1.add(d1.copy().mult(-amount * 0.5))
    p2.add(d1.copy().mult(-amount * 0.5))
    p3.add(d1.copy().mult(-amount * 0.5))
    p4.add(d1.copy().mult(-amount * 0.5))

    for (let i = 0; i < amount; i++) {
      p5.beginShape()
      p5.vertex(p1.x, p1.y)
      p5.vertex(p2.x, p2.y)
      p5.vertex(p3.x, p3.y)
      p5.vertex(p4.x, p4.y)
      p5.vertex(p1.x, p1.y)

      p1.add(d1)
      p2.add(d1)
      p3.add(d1)
      p4.add(d1)
      p5.endShape()
    }
  }

  p5.inputs = [
    {
      type: 'Button',
      attr: {
        value: 'Random'
      },

      onValue: () => {
        p5.draw()
      }
    }
  ]
}

// eslint-disable-next-line
export function quads_2 (p5) {
  let side = true

  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
  }

  p5.draw = function () {
    p5.background(255)
    const amount = 100
    const offset = 40

    if (side) {
      for (let i = 0; i < amount + 1; i++) {
        const x1 = p5.width * 0.5 - p5.height * 0.5
        const x2 = p5.width * 0.5 + p5.height * 0.5
        const y1 = p5.height * 0.5
        const y2 = offset + (p5.height - offset * 2) * (i / amount)

        if (i % 2 === 0) {
          p5.line(x1, y1, x2, y2)
        } else {
          p5.line(x2, y2, x1, y1)
        }
      }
    } else {
      for (let i = 0; i < amount + 1; i++) {
        const x1 = p5.width * 0.5 + p5.height * 0.5
        const x2 = p5.width * 0.5 - p5.height * 0.5
        const y1 = p5.height * 0.5
        const y2 = offset + ((p5.height - (offset * 2)) / amount) * i

        if (i % 2 === 0) {
          p5.line(x1, y1, x2, y2)
        } else {
          p5.line(x2, y2, x1, y1)
        }
      }
    }
  }

  p5.inputs = [
    {
      type: 'Button',
      attr: {
        value: side
      },
      onValue: () => {
        side = !side
        p5.draw()
      }
    }
  ]
}
