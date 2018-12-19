import { createCanvas } from '../utils'

// eslint-disable-next-line
export function circle_1 (p5) {
  let amount = 60
  let maxRadius = null
  let xMult = null
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
    maxRadius = p5.height * 0.4
    xMult = 2
  }

  p5.draw = function () {
    p5.background(255)
    for (let i = 1; i < amount; i++) {
      const percent = i / amount
      const radius = (1 - Math.pow(percent, 4)) * maxRadius
      p5.ellipse(maxRadius + p5.width * 0.15, p5.height * 0.5, radius * xMult, radius * 2)
    }
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Amount',
        min: 1,
        max: 70
      },

      onValue: value => {
        amount = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Radius Y',
        min: 20,
        max: 100
      },

      onValue: value => {
        xMult = (value / 100) * 4
        p5.draw()
      }
    }
  ]
}

// eslint-disable-next-line
export function circle_2 (p5) {
  let amount = 50
  let maxRadius = null
  let maxRadiusX = null
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()
    maxRadius = p5.height * 0.4
    maxRadiusX = maxRadius
  }

  p5.draw = function () {
    p5.background(255)
    for (let i = 0; i < amount + 1; i++) {
      const percent = i / amount
      p5.ellipse(maxRadiusX + p5.width * 0.15, p5.height * 0.5, maxRadiusX * 2, percent * maxRadius * 2)
    }
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Amount',
        min: 1,
        max: 50
      },

      onValue: value => {
        amount = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Radius Y',
        min: 20,
        max: 100
      },

      onValue: value => {
        maxRadiusX = p5.height * (value / 100)
        p5.draw()
      }
    }
  ]
}

// eslint-disable-next-line
export function circle_3 (p5) {
  let amount = 20
  let maxRadiusX = null
  let maxRadiusY = null
  p5.setup = function () {
    createCanvas(p5)
    p5.noLoop()
    p5.noFill()

    maxRadiusX = p5.height * 0.4
    maxRadiusY = p5.height * 0.4
  }

  p5.draw = function () {
    p5.background(255)
    for (let i = 0; i < amount + 1; i++) {
      const percent = i / amount
      p5.ellipse(maxRadiusX * 1.4, p5.height * 0.5, maxRadiusX * 2, percent * maxRadiusY * 2)
    }

    for (let i = 0; i < amount + 1; i++) {
      const percent = i / amount
      p5.ellipse(maxRadiusX * 1.4, p5.height * 0.5, percent * maxRadiusX * 2, maxRadiusY * 2)
    }
  }

  p5.inputs = [
    {
      type: 'Slider',
      attr: {
        value: 'Amount',
        min: 1,
        max: 50
      },

      onValue: value => {
        amount = value
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Radius X',
        min: 1,
        max: 100
      },

      onValue: value => {
        maxRadiusX = p5.height * (value / 100)
        p5.draw()
      }
    },

    {
      type: 'Slider',
      attr: {
        value: 'Radius Y',
        min: 1,
        max: 100
      },

      onValue: value => {
        maxRadiusY = p5.height * (value / 100)
        p5.draw()
      }
    }
  ]
}
