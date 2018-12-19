import { createCanvas } from '../utils'

export function test1 (p5) {
  let x = 0
  p5.setup = function () {
    createCanvas(p5)
    p5.pixelDensity(1)
    // p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    // const offset = 200
    p5.beginShape()
    p5.vertex(x, 100)
    p5.vertex(100, 300)
    p5.vertex(200, 400)
    p5.endShape()
  }

  p5.mouseClick = function () { }

  p5.inputs = [
    {
      type: 'Slider',

      attr: {
        value: 'Move X',
        min: 0,
        max: 200
      },

      onValue: value => {
        x = (value / 200) * p5.width
      }
    },
    {
      type: 'Slider',

      attr: {
        value: 'Move X',
        min: 0,
        max: 200
      },

      onValue: value => {
        x = (value / 200) * p5.width
      }
    },
    {
      type: 'Button',
      attr: {
        value: 'Random'
      },
      onValue: () => {
        console.log('aslkdjh')
      }
    }
  ]
}
