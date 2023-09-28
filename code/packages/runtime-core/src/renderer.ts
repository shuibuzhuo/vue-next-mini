import { Comment, Fragment, Text } from '@vue/runtime-core'
import { ShapeFlags } from 'packages/shared/src/shapeFlags'

export interface RendererOptions {
  setElementText: (el: Element, text: string) => void
  insert: (el: Element, parent: Element, anchor?) => void
  createElement: (type: string) => void
  patchProp: (el: Element, key: string, prevValue: any, nextValue: any) => void
}

export function createRenderer(options: RendererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RendererOptions) {
  const {
    setElementText: hostSetElementText,
    insert: hostInsert,
    createElement: setCreateElement,
    patchProp: hostPatchProp
  } = options

  const patch = (oldVNode, newVNode, container, anchor = null) => {
    if (oldVNode === newVNode) {
      return
    }

    const { type, shapeFlag } = newVNode

    switch (type) {
      case Text:
        break
      case Comment:
        break
      case Fragment:
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // TODO Element
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          // TODO Component
        }
    }
  }

  const render = (vnode, container) => {
    if (vnode == null) {
      // TODO 卸载操作
    } else {
      patch(container._vnode || null, vnode, container)
    }

    container._vnode = vnode
  }

  return {
    render
  }
}
