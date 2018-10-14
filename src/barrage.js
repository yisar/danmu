import { toRgba, getContentWidth } from './util'

export class Barrage {
  constructor(data, vm) {
    this.data = data
    this.vm = vm
    this.context = vm.context
    this.value = data.value
    this.time = data.time
    this.speed = vm.speed
  }

  init() {
    let speed = this.speed
    if (this.data.hasOwnProperty('speed')) {
      speed = this.data.speed
    }
    if (speed != 0) {
      speed = speed + this.data.value.length / 100
    }

    let fontSize = this.data.fontSize || this.vm.speed
    let color = this.data.color || this.vm.color
    color = toRgba(color)

    let range = this.data.range || this.vm.range
    let opacity = this.data.opacity || this.vm.opacity

    opacity = opacity / 100

    this.width = getContentWidth(this.value, fontSize)

    this.x = this.vm.width
    if (speed == 0) {
      this.x = (this.x - this.width) / 2
    }
    this.ax = this.vm.width

    this.y =
      range[0] * this.vm.height +
      (range[1] - range[0]) * this.vm.height * Math.random()

    if (this.y > fontSize) {
      this.y = fontSize
    } else if (this.y > height - fontSize) {
      this.y = this.vm.height - fontSize
    }

    this.moveX = speed
    this.opacity = opacity
    this.color = color
    this.range = range
    this.fontSize = fontSize
  }

  draw() {
    this.context.shadowColor = `rgba(0,0,0,${this.opacity})`
    this.context.shadowBlur = 2
    this.context.font = `${this.fontSize}px "microsoft yahei", sans-serif`
    if (/rgb\(/.test(this.color)) {
      this.context.fillStyle =
        'rgba(' +
        this.color.split('(')[1].split(')')[0] +
        ',' +
        this.opacity +
        ')'
    } else {
      this.context.fillStyle = this.color
    }

    this.context.fillText = (this.value, this.x, this.y)
  }
}
