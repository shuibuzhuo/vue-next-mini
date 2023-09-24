import { EMPTY_OBJ, hasChanged, isObject } from "@vue/shared"
import { isReactive } from "packages/reactivity/src/reactive"
import { queuePreFlushCb } from "./scheduler"
import { ReactiveEffect } from "packages/reactivity/src/effect"

export interface WatchOptions<Immediate = boolean> {
  deep?: boolean
  immediate?: Immediate
}

export function watch(source, cb: Function, options?: WatchOptions) {
  return doWatch(source as any, cb, options)
}

function doWatch(source, cb: Function, { deep, immediate }: WatchOptions = EMPTY_OBJ) {
  let getter: () => any

  if (isReactive(source)) {
    getter = () => source
    deep = true
  } else {
    getter = () => {}
  }
  
  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }

  let oldValue = {}

  const job = () => {
    if (cb) {
      const newValue = effect.run()

      if (deep || hasChanged(newValue, oldValue)) {
        cb(newValue, oldValue)
        oldValue = newValue
      }
    }
  }

  let scheduler = () => queuePreFlushCb(job)

  const effect = new ReactiveEffect(getter, scheduler)

  if (cb) {
    if (immediate) {
      job()
    } else {
      oldValue = effect.run()
    }
  } else {
    effect.run()
  }

  return () => {
    effect.stop()
  }
}

export function traverse(value: unknown) {
  if (!isObject(value)) {
    return value
  }

  for (let key in value as object) {
    traverse((value as object)[key])
  }

  return value
}
