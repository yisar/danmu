import Danmu from './src/danmu'

const canvas = document.getElementById('canvas')
const video = document.getElementById('video')

const data = [
  {
    value: 'speed设为0为非滚动',
    time: 1, // 单位秒
    speed: 0
  },
  {
    value: 'time控制弹幕时间，单位秒',
    color: 'blue',
    time: 2
  },
  {
    value: '视频共21秒',
    time: 3.2
  },
  {
    value: '视频背景为白色',
    time: 4.5
  },
  {
    value: '视频为录制',
    time: 5.0
  },
  {
    value: '视频内容简单',
    time: 6.3
  },
  {
    value: '是为了让视频尺寸不至于过大',
    time: 7.8
  },
  {
    value: '省流量',
    time: 8.5
  },
  {
    value: '支持弹幕暂停（视频暂停）',
    time: 9
  },
  {
    value: 'add()方法新增弹幕',
    time: 11
  },
  {
    value: 'reset()方法重置弹幕',
    time: 11
  },
  {
    value: '颜色，字号，透明度可全局设置',
    time: 13
  },
  {
    value: '具体交互细节可参考页面源代码',
    time: 14
  },
  {
    value: '内容不错哦！',
    time: 18,
    color: 'yellow'
  }
]

new Danmu(canvas, video, {
  data
})
