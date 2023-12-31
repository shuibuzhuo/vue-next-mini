import { isArray, isFunction, isObject, isString } from '@vue/shared'
import { normalizeClass } from 'packages/shared/src/normalizedProp'
import { ShapeFlags } from 'packages/shared/src/shapeFlags'

export interface VNode {
  __v_isVNode: true
  type: any
  props: any
  children: any
  shapeFlag: number
  key: any
}

export const Text = Symbol('Text')
export const Comment = Symbol('Comment')
export const Fragment = Symbol('Fragment')

export const isVNode = (value: any): value is VNode => {
  return value ? value.__v_isVNode === true : false
}

export { createVNode as createElementVNode }

export function createVNode(type, props, children): VNode {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0

  if (props) {
    const { class: klass, style } = props

    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
  }

  return createBaseVNode(type, props, children, shapeFlag)
}

function createBaseVNode(type, props, children, shapeFlag): VNode {
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    children,
    shapeFlag,
    key: props?.key || null
  } as VNode

  normalizeChildren(vnode, children)

  return vnode
}

function normalizeChildren(vnode, children) {
  let type = 0

  if (children == null) {
    children = null
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'object') {
  } else if (isFunction(children)) {
  } else {
    children = String(children)
    type = ShapeFlags.TEXT_CHILDREN
  }

  vnode.children = children
  vnode.shapeFlag |= type
}

export function isSameVNodeType(n1: VNode, n2: VNode) {
  return n1.type === n2.type && n1.key === n2.key
}
