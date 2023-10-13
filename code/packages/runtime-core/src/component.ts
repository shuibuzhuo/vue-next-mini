import { reactive } from '@vue/reactivity'
import { isFunction, isObject } from '@vue/shared'
import { onBeforeMount, onMounted } from './apiLifecycles'

let uid = 0

export function createComponentInstance(vnode) {
  const type = vnode.type

  const instance = {
    uid: uid++,
    vnode,
    type,
    subTree: null,
    effect: null,
    update: null,
    render: null,
    isMounted: false,
    bc: null,
    c: null,
    bm: null,
    m: null
  }

  return instance
}

export function setupComponent(instance) {
  const setupResult = setupStatefulComponent(instance)
  return setupResult
}

function setupStatefulComponent(instance) {
  const Component = instance.type

  const { setup } = Component

  if (setup) {
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
  }
}

function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    instance.render = setupResult
  }
  finishComponentSetup(instance)
}

export function finishComponentSetup(instance) {
  const Component = instance.type

  if (!instance.render) {
    instance.render = Component.render
  }

  applyOptions(instance)
}

function applyOptions(instance) {
  const {
    data: dataOptions,
    beforeCreate,
    created,
    beforeMount,
    mounted
  } = instance.type

  if (beforeCreate) {
    callHook(beforeCreate, instance.data)
  }

  if (dataOptions) {
    const data = dataOptions()

    if (isObject(data)) {
      instance.data = reactive(data)
    }
  }

  if (created) {
    callHook(created, instance.data)
  }

  function registerLifecycleHooks(register, hook) {
    register(hook?.bind(instance.data), instance)
  }

  registerLifecycleHooks(onBeforeMount, beforeMount)
  registerLifecycleHooks(onMounted, mounted)
}

function callHook(hook: Function, proxy) {
  hook.bind(proxy)()
}

export const enum LifecycleHooks {
  BEFORE_CREATE = 'bc',
  CREATED = 'c',
  BEFORE_MOUNT = 'bm',
  MOUNTED = 'm'
}
