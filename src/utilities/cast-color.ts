function h2d(value = 'ff') {
  return +`0x${value}`
}

export function castColor(value: string) {
  const [R, G, B] = value.match(/\w{1,2}/gi) ?? []
  return [h2d(R), h2d(G), h2d(B)]
}
