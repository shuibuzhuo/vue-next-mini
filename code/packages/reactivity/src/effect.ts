import { isArray } from '@vue/shared'
import { Dep, createDep } from './dep'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)

  _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    activeEffect = this

    return this.fn()
  }
}

export function track(target: object, key: unknown) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }

  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  let dep = depsMap.get(key)

  if (!dep) return

  triggerEffects(dep)
}

export function triggerEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep]

  for (const effect of effects) {
    triggerEffect(effect)
  }
}

export function triggerEffect(effect: ReactiveEffect) {
  effect.run()
}
