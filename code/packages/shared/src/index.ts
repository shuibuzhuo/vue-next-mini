/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray

/**
 * 判断值是否改变
 */
export const hasChanged = (value: any, oldValue: any) =>
  !Object.is(value, oldValue)

/**
 * 判断是否为一个对象
 */
export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

/**
 * 判断是否为一个函数
 */
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

/**
 * 判断是否为一个字符串
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/** 合并对象属性 */
export const extend = Object.assign

/** 定义一个常量，是个空对象 */
export const EMPTY_OBJ: { readonly [key: string]: any } = {}
