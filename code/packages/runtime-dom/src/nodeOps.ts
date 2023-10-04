const doc = document

export const nodeOps = {
  createElement(tag: string): Element {
    const el = doc.createElement(tag)

    return el
  },

  setElementText(el: Element, text: string) {
    el.textContent = text
  },

  insert(child: Element, parent: Element, anchor?) {
    parent.insertBefore(child, anchor || null)
  },

  remove(child: Element) {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },

  createText(text: string) {
    return doc.createTextNode(text)
  },

  setText(el: Element, text: string) {
    el.nodeValue = text
  },

  createComment(text: string) {
    return doc.createComment(text)
  }
}
