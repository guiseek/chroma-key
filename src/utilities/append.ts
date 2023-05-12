export const append = <T extends HTMLElement>(container: T, ...elements: T[]) => {
  container.append(...elements)
  return container
}
