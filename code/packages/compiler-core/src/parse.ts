export interface ParserContext {
  source: string
}

function createParserContext(content: string): ParserContext {
  return {
    source: content
  }
}

export function baseParse(content: string) {
  const context = createParserContext(content)

  console.log('baseParse context', context)

  return {}
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
}

function startsWithEndTagOpen(source: string, tag: string): boolean {
  return startsWith(source, '</')
}
