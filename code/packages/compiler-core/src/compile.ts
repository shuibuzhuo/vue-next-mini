import { extend } from '@vue/shared'
import { baseParse } from './parse'
import { transformElement } from './transforms/transformElement'
import { transformText } from './transforms/transformText'
import { transform } from './transform'

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template)

  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText]
    })
  )

  console.log('baseCompile ast', ast)
  console.log('baseCompile JSON.stringify(ast)', JSON.stringify(ast))

  return {}
}
