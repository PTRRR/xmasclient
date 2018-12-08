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
    const offset = 100
    p5.rect(offset, offset, p5.width - offset * 2, p5.height - offset * 2)
  }

  p5.mouseClick = function () { }
}
