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
    render: null
  }

  return instance
}

export function setupComponent(instance) {
  const setupResult = setupStatefulComponent(instance)
  return setupResult
}

function setupStatefulComponent(instance) {
  finishComponentSetup(instance)
}

export function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render
}
