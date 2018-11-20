export function maze (p5) {
  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
  }

  p5.draw = function () {
    p5.background(255)
    p5.fill(255, 0, 0)
    p5.rect(0, 0, p5.width, p5.height)
  }
}

export function maze1 (p5) {
  p5.setup = function () {
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    p5.createCanvas(clientWidth, clientHeight)
  }

  p5.draw = function () {
    p5.background(255)
    p5.ellipse(p5.mouseX, p5.mouseY, 100, 100)
  }
}
