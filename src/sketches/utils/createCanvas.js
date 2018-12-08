export function createCanvas (p5) {
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
}
