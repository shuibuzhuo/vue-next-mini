import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'
import { patchDOMProp } from './modules/props'
import { patchAttr } from './modules/attrs'
import { patchStyle } from './modules/style'
import { patchEvent } from './modules/event'

export function patchProp(el, key, prevValue, nextValue) {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (isOn(key)) {
    patchEvent(el, key, prevValue, nextValue)
  } else if (shouldSetAsProp(el, key)) {
    patchDOMProp(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}

function shouldSetAsProp(el: Element, key: string) {
  if (key === 'form') {
    return false
  }

  if (el.tagName === 'INPUT' && key === 'list') {
    return false
  }

  if (el.tagName === 'TEXTAREA' && key === 'type') {
    return false
  }

  return key in el
}
