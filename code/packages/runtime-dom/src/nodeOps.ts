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
  }
}
