type IdSelector =
  | `#${string}`
  | `#${string} ${string}`
  | `#${string} > ${string}`
  | `${string}#${string}`

type ClassSelector =
  | `.${string}`
  | `.${string} .${string}`
  | `.${string} > .${string}`
  | `${string}.${string}`

type AttributeSelector =
  | `[${string}]`
  | `[${string}] ${string}`
  | `[${string}] > ${string}`
  | `${string}[${string}]`

function query<Tag extends keyof SVGElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): SVGElementTagNameMap[Tag]

function query<Tag extends keyof HTMLElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): HTMLElementTagNameMap[Tag]

function query<
  Tag extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement: HTMLElement | SVGElement = document.body
) {
  return parentElement.querySelector(selector)
}

function queryAll<Tag extends keyof SVGElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): NodeListOf<SVGElementTagNameMap[Tag]>

function queryAll<Tag extends keyof HTMLElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): NodeListOf<HTMLElementTagNameMap[Tag]>

function queryAll<
  Tag extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement: HTMLElement | SVGElement = document.body
) {
  return parentElement.querySelectorAll(selector)
}

export { query, queryAll }
