class Danmu {
  constructor(canvas, video, options) {
    this.canvas = canvas
    this.video = video
    this.options = options
    this.store = {}
    this.isPause = true
    this.time = video.currentTime
    this.fontSize = 28

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

    this.context = canvas.getContext('2d')
    canvas.width = this.canvas.clientWidth
    canvas.height = this.canvas.clientHeight

    new Barrage(this)

  }

}

export default Danmu
