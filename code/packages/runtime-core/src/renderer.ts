import { Comment, Fragment, Text } from '@vue/runtime-core'
import { ShapeFlags } from 'packages/shared/src/shapeFlags'

export interface RendererOptions {
  setElementText: (el: Element, text: string) => void
  insert: (el: Element, parent: Element, anchor?) => void
  createElement: (type: string) => Element
  patchProp: (el: Element, key: string, prevValue: any, nextValue: any) => void
}

export function createRenderer(options: RendererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RendererOptions) {
  const { createElement: hostCreateElement, setElementText: hostSetElementText, patchProp: hostPatchProp, insert: hostInsert} = options

  const processElement = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      mountElement(newVNode, container, anchor)
    } else {
      // TODO 更新操作
    }
  }

  const mountElement = (vnode, container, anchor) => {
    const { type, shapeFlag, props } = vnode
    const el = vnode.el = hostCreateElement(type)

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, vnode.children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {}

    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }

    hostInsert(el, container, anchor)
  }

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
          processElement(oldVNode, newVNode, container, anchor)
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
