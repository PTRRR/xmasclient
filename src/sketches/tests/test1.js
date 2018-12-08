export function test1 (p5) {
  p5.setup = function () {
    const { controllerConfig } = window
    const { maxStepsX, maxStepsY } = controllerConfig
    const controllerRatio = maxStepsX / maxStepsY
    const container = document.querySelector('.sketch__container')
    const { clientWidth, clientHeight } = container
    const containerRatio = clientWidth / clientHeight

    if (controllerRatio > containerRatio) {
      p5.createCanvas(clientWidth, clientWidth / controllerRatio)
    } else {
      p5.createCanvas(clientHeight * controllerRatio, clientHeight)
    }
    p5.pixelDensity(1)
    p5.noLoop()
  }

  p5.draw = function () {
    p5.background(255)
    // p5.rect(0, 0, p5.width, p5.height)
    // p5.rect(0, 0, 100, 100)
    // p5.rect(p5.width - 100, 0, 100, 100)
    // p5.rect(p5.width - 100, p5.height - 100, 100, 100)
    // p5.rect(0, p5.height - 100, 100, 100)
    p5.ellipse(p5.width * 0.5, p5.height * 0.5, 600, 600)
  }

  p5.mouseClick = function () { }
}
