/* eslint-disable */
import { createCanvas } from '../utils'
import { clamp } from '../utils'

export function Flocon (p5) {
  var px, py, px2, py2
  var angle, angle2
  var radius = p5.width / 4
  var frequency = 2
  var frequency2 = 2
  var x, x2
  var step = 20
  var ppx; var ppy = 0
  var maxangle = 360 * 12.5
  var stepangle = 10
  var div = 100
  var div2 = 20
  var side = 6
  var smooth = 6

  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
  }
  p5.draw = function () {
    p5.background(255)
    p5.fill(0)
    p5.stroke(0)
    stepangle = 360 / (side * smooth)
    // maxangle = maxangle+360/side*2;
    // 305
    // 12 OK ;) 12.5 parfait
    var lcos = p5.cos(p5.radians(maxangle) * side)
    var variation = (lcos * maxangle / div + maxangle / div2)
    console.log('variation')
    console.log(variation)
    console.log(lcos)
    for (var angle = 0; angle <= maxangle; angle += stepangle) {
      var tcos = p5.cos(p5.radians(angle) * side)

      px = (p5.width / 2) + p5.cos(p5.radians(angle)) * (tcos * angle / div + angle / div2)

      // px = (p5.width / 2) + p5.cos(p5.radians(angle)) * (tcos * angle)

      py = p5.height / 2 + p5.sin(p5.radians(angle)) * (tcos * angle / div + angle / div2)
      // py = p5.height / 2 + p5.sin(p5.radians(angle)) * (tcos * angle)

      var offset = p5.width / 30

      px = Math.min(Math.max(px, offset), p5.width - offset)
      py = Math.min(Math.max(py, offset), p5.height - offset)

      if (angle != 0) {
        p5.line(ppx, ppy, px, py)
      }
      ppx = px
      ppy = py
    }
  }
  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        min: 1,
        max: 40,
        value: 'Revolutions'
      },

      onValue: value => {
        maxangle = 360 * value
        p5.draw()
        console.log(maxangle)
      }
    }, {
      type: 'Slider',
      attr: {
        min: 1,
        max: 20,
        value: 'Smoothness'
      },

      onValue: value => {
        smooth = value
        // stepangle = 360/side;
        p5.draw()
        // console.log(value);
        console.log(smooth)
      }
    }, {
      type: 'Slider',
      attr: {
        min: 3,
        max: 20,
        value: 'Number of spikes'
      },

      onValue: value => {
        side = value
        // stepangle = 360/side;
        p5.draw()
        console.log(side)
      }
    }, {
      type: 'Slider',
      attr: {
        min: 10,
        max: 160,
        value: 'Sharpness'
      },

      onValue: value => {
        div = value
        // stepangle = 360/side;
        p5.draw()
        // console.log(value);
        console.log(div)
      }
    }, {
      type: 'Slider',
      attr: {
        min: 1,
        max: 200,
        value: 'Centers'
      },

      onValue: value => {
        div2 = value
        // stepangle = 360/side;
        p5.draw()
        // console.log(value);
        console.log(div2)
      }
    }
  ]
}
