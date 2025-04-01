import { renderToDOM } from './myDOM.js'

let currentRoot = null

class Root {
  constructor(root) {
    this.root = root
  }

  render(renderedElement) {
    this.initialRenderedElement = renderedElement

    currentRoot = this
    const { fiberNode, element } = renderToDOM(renderedElement, this.fiberRoot)
    this.fiberRoot = fiberNode
    this.root.replaceChildren(element)
    currentRoot = null
  }

  reRender() {
    this.render(this.initialRenderedElement)
  }
}

export class Component {
  constructor(props) {
    this.props = props
    this.root = currentRoot
  }

  reRender() {
    this.root.reRender()
  }
}

export function createRoot(root) {
  return new Root(root)
}
