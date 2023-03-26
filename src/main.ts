import { getStateHandler } from './utilities/state'
import { query } from './utilities/query'
import chromaKey from './chroma-key'
import './style.scss'

const videoView = query('video')
const canvasView = query('canvas')
const videoContext = canvasView.getContext('2d')!

getStateHandler<ChromaKeyState>({
  videoView,
  videoContext,
  canvasView,
}).get()

navigator.mediaDevices.getUserMedia({ video: true }).then((streamVideo) => {
  videoView.srcObject = streamVideo
})

videoView.addEventListener('loadeddata', () => {
  canvasView.width = videoView.videoWidth
  canvasView.height = videoView.videoHeight
  setInterval(chromaKey, 40)
})
