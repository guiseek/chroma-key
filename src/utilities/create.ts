export function create<K extends keyof HTMLElementTagNameMap>(
  name: K,
  attributes: Partial<HTMLElementTagNameMap[K]> = {}
) {
  return Object.assign(document.createElement(name), attributes)
}

document.body.appendChild(
  create('button', {
    id: '',
    innerText: 'ANIME INGA',
    onclick(event) {
      console.log(event)
    },
    onmouseover(e) {
      console.log(e)
    }
  })
)
