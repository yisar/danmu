class Barrage {
  constructor(obj) {
    this.value = obj.value
    this.time = obj.time
    this.obj = obj
  }

  init() {
    let speed = this.speed
    if (this.obj.hasOwnProperty('speed')) {
      speed = this.obj.speed
    }

    if (speed !== 0) {
      speed = speed + this.obj.value.length / 100
    }

    let fontSize = this.obj.fontSize
    let color = this.obj.color
    
  }
}
