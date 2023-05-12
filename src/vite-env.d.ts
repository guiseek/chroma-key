/// <reference types="vite/client" />

interface ChromaKeyState {
  videoView: HTMLVideoElement
  videoContext: CanvasRenderingContext2D
  canvasView: HTMLCanvasElement
}

interface ContextRenderingMap {
  '2d': CanvasRenderingContext2D
  bitmaprenderer: ImageBitmapRenderingContext
  webgl: ImageBitmapRenderingContext
  webgl2: WebGL2RenderingContext
}

interface ConnectedCallback {
  (): void
}

interface DisconnectedCallback {
  (): void
}

interface AttributeChangedCallback {
  <T>(name: string, previous: T | null, next: T | null): void
}

interface CustomElementConstructor {
  connectedCallback?: ConnectedCallback
  disconnectedCallback?: DisconnectedCallback
  attributeChangedCallback?: AttributeChangedCallback
  connected?: ConnectedCallback
  disconnected?: DisconnectedCallback
  attributeChanged?: AttributeChangedCallback
}

interface Event<T = any> {
  readonly target: EventTarget | null
}

type H<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]
