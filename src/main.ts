import getStateHandler from './utilities/state'
import chromaKey from './chroma-key'
import './style.scss'

const videoView = document.querySelector<HTMLVideoElement>('#videoView')!
const canvasView = document.querySelector<HTMLCanvasElement>('#canvasView')!
const videoContext = canvasView.getContext('2d')!

const handler = getStateHandler<ChromaKeyState>()

handler.on(console.log)

handler.set({ videoView, videoContext, canvasView })

navigator.mediaDevices.getUserMedia({ video: true }).then((streamVideo) => {
  videoView.srcObject = streamVideo
})

videoView.addEventListener('loadeddata', () => {
  canvasView.width = videoView.videoWidth
  canvasView.height = videoView.videoHeight
  setInterval(chromaKey, 40)
})
