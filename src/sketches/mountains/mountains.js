export function mountains (p5) {
  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
  }

  p5.draw = function () {
    p5.background(255)
    p5.fill(255, 0, 0)
    const amount = 80
    const step = 20
    for (let i = 0; i < amount; i++) {
      const x = i * step
      const y = p5.height

      if (i % 2) {
        p5.line(x, 0, x, y)
      } else {
        p5.line(x, y, x, 0)
      }
    }

    for (let i = 0; i < amount; i++) {
      const size = i / amount
      const x = i * step + step * 0.5
      const y = p5.height * 0.5 * size

      if (i % 2) {
        p5.line(x - step, p5.height * 0.5 - y, x, y + p5.height * 0.5)
      } else {
        p5.line(x, y + p5.height * 0.5, x - step, p5.height * 0.5 - y)
      }
    }
  }
}
