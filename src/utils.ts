/**
 * Takes a key-value map and returns
 * a map with { value: key } of the old map
 */
export function reverseMap (map) {
  const reversedMap = {}

  for (const key in map) {
    reversedMap[map[key]] = key
  }

  return reversedMap
}

/**
 * Like reverseMap but the values will be cast using Number(k)
 */
export function reverseMapNumeric (map: { [k: number]: number }) {
  const reversedMap = {}

  for (const key in map) {
    reversedMap[map[key]] = Number(key)
  }

  return reversedMap
}

/**
 * convertMap({ a: { x: 1 }, b: { x: 2 }, c: { x : 3 } }, 'x', 'y')
 *  ===
 * { a: { y: 1 }, b: { y: 2 }, c: { y : 3 } }
 */
export function convertMap (map, from, to) {
  const result = {}

  for (const key in map) {
    result[map[key][from]] = map[key][to]
  }

  return result
}
