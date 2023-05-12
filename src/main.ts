import {append, toStr, create, query} from './utilities'
import './style.scss'

const output = create('output')
const vars = {
  fps: create('var', {id: 'fps', innerText: '0'}),
  mdi: create('var', {id: 'mdi', innerText: toStr({})}),
}

const video = query('video')
const canvas = query('canvas')

const render = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  let {width, height} = canvas
  let paintCount = 0
  let startTime = 0.0

  const ctx = canvas.getContext('2d')

  const update = (now: number, metadata: VideoFrameCallbackMetadata) => {
    if (startTime === 0.0) {
      startTime = now
    }

    const elapsed = (now - startTime) / 1000.0
    const fps = (++paintCount / elapsed).toFixed(2)
    console.log(elapsed, fps)

    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const dataLength = imageData.data.length

      for (let i = 0; i < dataLength; i++) {
        const offset = i * 4
        const red = imageData.data[offset + 0]
        const green = imageData.data[offset + 1]
        const blue = imageData.data[offset + 2]

        if (green > 90 && green > red && green > blue) {
          imageData.data[offset + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    vars.fps.innerText = `FPS: ${fps}`
    vars.mdi.innerText = toStr(metadata)

    video.requestVideoFrameCallback(update)
  }

  return update
}

navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
  video.onplay = () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    video.requestVideoFrameCallback(render(video, canvas))
  }
  video.srcObject = stream
})

append(document.body, append(output, vars.fps, vars.mdi))