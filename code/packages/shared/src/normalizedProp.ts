import { isArray, isObject, isString } from '.'

export function normalizeClass(value: unknown): string {
  let res = ''

  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + ' '
      }
    }
  } else if (isObject(value)) {
    for (let key in value as object) {
      if ((value as object)[key]) {
        res += key + ' '
      }
    }
  }

  return res.trim()
}
