import { extend } from '@vue/shared'
import { baseParse } from './parse'
import { transformElement } from './transforms/transformElement'
import { transformText } from './transforms/transformText'
import { transform } from './transform'
import { generate } from './codegen'

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template)

  console.log('baseParse ast', ast)

  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText]
    })
  )

  console.log('ast', ast)

  return generate(ast)
}
