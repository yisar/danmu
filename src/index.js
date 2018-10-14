import { Barrage } from './barrage'

class Danmu {
  constructor(canvas, video, options) {
    this.canvas = canvas
    this.video = video
    this.options = options
    this.store = {}
    this.isPause = true
    this.time = video.currentTime
    this.fontSize = 28
    this.width = 0
    this.height = 0

    let defaults = {
      opacity: 100,
      fontSize: 24,
      speed: 2,
      range: [0, 1],
      color: '#fff',
      data: []
    }

    let params = {}

    for (let key in defaults) {
      if (options[key]) {
        params[key] = options[key]
      } else {
        params[key] = defaults[key]
      }

      this[key] = params[key]
    }

    this.context = this.canvas.getContext('2d')
    this.width = this.canvas.clientWidth
    this.height = this.canvas.clientHeight

    this.data.forEach((data, index) => {
      this.store[index] = new Barrage(data, this)
    })

    this.video.onplay = () => {
      this.isPause == false
      this.render()
    }

    this.video.onpause = () => {
      this.isPause = true
    }

    this.video.onseeked = () => {
      this.reset()
    }
  }

  draw() {
    for (let index in this.store) {
      let dm = this.store[index]
      if (dm && !dm.disabled) {
        if (!dm.inited) {
          dm.init()
          dm.inited = true
        }

        dm.x -= dm.moveX
        if (dm.moveX == 0) {
          dm.ax -= this.speed
        } else {
          dm.ax = dm.x
        }

        if (dm.ax < -1 * dm.width) {
          dm.x = dm.ax
          dm.disabled = true
        }

        dm.draw()
      }
    }
  }

  render() {
    this.time = video.currentTime

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.draw()

    if (!this.isPause) {
      requestAnimationFrame(render)
    }
  }

  add(data) {
    this.store[Object.keys(this.store).length] = new Barrage(data, this)
  }

  reset() {
    this.time = video.currentTime

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (var index in this.store) {
      let dm = this.store[index]
      if (dm) {
        dm.disabled = false
        if (this.time < dm.time) {
          dm.inited = null
        } else {
          dm.disabled = true
        }
      }
    }
  }
}

export default Danmu
