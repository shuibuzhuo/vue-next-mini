import { extend } from "@vue/shared"
import { createRenderer } from "packages/runtime-core/src/renderer"
import { patchProp } from "./patchProp"
import { nodeOps } from "./nodeOps"

let renderer

const rendererOptions = extend({ patchProp }, nodeOps)

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}

export const render = (...args) => {
  ensureRenderer().render(...args)
}
