import {append, toStr, create, query, castColor} from './utilities'
import './style.scss'




const output = create('output')
const vars = {
  fps: create('var', {id: 'fps', innerText: '0'}),
  mdi: create('var', {id: 'mdi', innerText: toStr({})}),
}

const video = query('video')
// const canvas = query('canvas')

const pickColor = async () => {
  let eyeDropper = new EyeDropper()
  const {sRGBHex} = await eyeDropper.open()
  return castColor(sRGBHex) as ChromaColor
}

const inRange = (c1: number, c2: number) => {
  return c1 < c2 + 20 && c1 > c2 - 20
}

const canvas = create('canvas')

const render = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  let {width, height} = canvas
  let paintCount = 0
  let startTime = 0.0

  let colors: ChromaColor[] = [[119, 255, 119]]

  canvas.onclick = () => {
    pickColor().then((c) => colors.push(c))
  }
  onkeyup = ({key, ctrlKey}) => {
    if (ctrlKey && key === 'r') {
      colors = []
    }
  }

  const ctx = canvas.getContext('2d', {willReadFrequently: true})

  const update = (now: number, metadata: VideoFrameCallbackMetadata) => {
    if (startTime === 0.0) {
      startTime = now
    }

    const elapsed = (now - startTime) / 1000.0
    const fps = (++paintCount / elapsed).toFixed(2)

    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height)

      const image = ctx.getImageData(0, 0, width, height)

      for (let i = 0; i < image.data.length; i++) {
        handleChroma(i, image)
      }

      ctx.putImageData(image, 0, 0)
    }

    vars.fps.innerText = `FPS: ${fps}`
    vars.mdi.innerText = toStr(metadata)

    video.requestVideoFrameCallback(update)

    function handleChroma(i: number, image: ImageData, key = 90) {
      const offset = i * 4
      const red = image.data[offset + 0]
      const green = image.data[offset + 1]
      const blue = image.data[offset + 2]

      const match = colors.some(([r, g, b]) => {
        return inRange(r, red) && inRange(g, green) && inRange(b, blue)
      })
      if (match) {
        image.data[offset + 3] = 0
      }
      // if (green > key && green > red && green > blue) {
      //   image.data[offset + 3] = 0
      // }
    }
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

append(document.body, canvas, append(output, vars.fps, vars.mdi))
