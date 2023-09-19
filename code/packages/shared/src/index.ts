/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray

export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'
