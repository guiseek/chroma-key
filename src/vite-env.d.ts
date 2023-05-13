/// <reference types="vite/client" />

type ColorSelectionResult = {
  sRGBHex: string
}

type ColorSelectionOptions = {
  signal: AbortSignal
}

declare class EyeDropper {
  open(options?: ColorSelectionOptions): Promise<ColorSelectionResult>
}

type H<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]

type ChromaColor = [number, number, number]
