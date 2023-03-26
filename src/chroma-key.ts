import {getStateHandler} from './utilities/state'

const handler = getStateHandler<ChromaKeyState>()

function chromaKey() {
  const state = handler.get()

  if (state) {
    const { width, height } = state.canvasView
    state.videoContext.drawImage(state.videoView, 0, 0, width, height)
    const imageData = state.videoContext.getImageData(0, 0, width, height)
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
    state.videoContext.putImageData(imageData, 0, 0)
  }
}

export default chromaKey
