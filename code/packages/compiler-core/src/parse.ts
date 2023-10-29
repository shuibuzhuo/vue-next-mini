import { ElementTypes, NodeTypes } from './ast'

export interface ParserContext {
  source: string
}

const enum TagType {
  Start,
  End
}

function createParserContext(content: string): ParserContext {
  return {
    source: content
  }
}

export function baseParse(content: string) {
  const context = createParserContext(content)

  const children = parseChildren(context, [])

  console.log('baseParse children', children)

  return createRoot(children)
}

export function createRoot(children) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc: {}
  }
}

function parseChildren(context: ParserContext, ancestors) {
  const nodes = []

  while (!isEnd(context, ancestors)) {
    const s = context.source
    let node
    if (startsWith(s, '{{')) {
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors)
      }
    }

    if (!node) {
      node = parseText(context)
    }

    pushNode(nodes, node)
  }

  return nodes
}

function parseText(context: ParserContext) {
  const endTokens = ['<', '{{']

  let endIndex = context.source.length

  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1)

    if (index !== -1 && index < endIndex) {
      endIndex = index
    }
  }

  const content = parseTextData(context, endIndex)

  return {
    type: NodeTypes.TEXT,
    content
  }
}

function parseTextData(context: ParserContext, length: number): string {
  const rawText = context.source.slice(0, length)
  advanceBy(context, length)
  return rawText
}

function parseElement(context: ParserContext, ancestors) {
  const element = parseTag(context, TagType.Start)

  ancestors.push(element)
  const children = parseChildren(context, ancestors)
  ancestors.pop()
  element.children = children

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End)
  }

  return element
}

function parseTag(context, type: TagType) {
  const match: any = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  const tag = match[1]

  advanceBy(context, match[0].length)

  let isSelfClosing = startsWith(context.source, '/>')
  advanceBy(context, isSelfClosing ? 2 : 1)

  let tagType = ElementTypes.ELEMENT

  return {
    type: NodeTypes.ELEMENT,
    tag,
    tagType,
    props: [],
    children: []
  }
}

function advanceBy(context: ParserContext, numberOfCharacters) {
  const { source } = context
  context.source = source.slice(numberOfCharacters)
}

function pushNode(nodes, node) {
  nodes.push(node)
}

function startsWith(source: string, searchString: string): boolean {
  return source.startsWith(searchString)
}

function isEnd(context: ParserContext, ancestors): boolean {
  const s = context.source

  if (startsWith(s, '</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
        return true
      }
    }
  }

  return !s
}

function startsWithEndTagOpen(source: string, tag: string): boolean {
  return startsWith(source, '</')
}
