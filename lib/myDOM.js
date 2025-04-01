export function createEl(component, props) {
  return {
    type: component,
    props,
  }
}

export function renderToDOM(node, current) {
  if (!node) return null

  if (typeof node === 'string') {
    let instance

    // check current exist and whether the type is the same as node
    if (current?.type === 'string') {
      // updating the text content with node
      instance = current.instance
      instance.textContent = node
    } else {
      // otherwise, we should create a new instance
      instance = document.createTextNode(node)
    }

    return {
      fiberNode: {
        type: 'string',
        instance,
      },
      element: instance,
    }
  }

  const { type: component, props: { children, ...props } = {} } = node

  if (typeof component === 'function') {
    let instance

    if (component === current?.type && current.instance) {
      instance = current.instance
      // updating props too
      instance.props = props
    } else {
      instance = new component(props)
    }

    // for now we assume our custom component returns single child
    const result = renderToDOM(instance.render(), current?.props?.children?.[0])
    return {
      fiberNode: {
        type: component,
        props: {
          ...props,
          children: [result.fiberNode],
        },
        instance,
      },
      element: result.element,
    }
  }

  let instance
  if (current?.type === node.type) {
    instance = current.instance

    // remove the props
    if (current.props) {
      Object.entries(current.props).map(([key, _]) => {
        if (key.startsWith('on')) {
          instance[key] = null
        } else if (key === 'dataset') {
          delete instance.dataset[key]
        } else {
          if (key === 'value') instance.value = ''
          instance.removeAttribute(key)
        }
      })
    }

    // remove the children
    instance.replaceChildren()
  } else {
    instance = document.createElement(component)
  }

  const fiberNode = {
    type: component,
    props: {
      children: [],
    },
    instance,
  }

  if (props) {
    Object.entries(props).map(([key, value]) => {
      if (key.startsWith('on')) {
        instance[key] = value
      } else if (key === 'dataset') {
        Object.assign(instance.dataset, value)
      } else {
        if (key === 'value') instance.value = value
        else instance.setAttribute(key, value)
      }
    })
  }

  if (children) {
    const childrenArr = (
      Array.isArray(children) ? children : [children]
    ).filter(Boolean)

    const currentChildrenArr = (
      Array.isArray(current?.props.children)
        ? current?.props.children
        : [current?.props.children]
    ).filter(Boolean)

    const childrenWithKeys = currentChildrenArr
      .filter(child => child.props?.key)
      .reduce((acc, child) => {
        const key = child.props.key
        if (!acc[key]) acc[key] = []
        acc[key].push(child)
        return acc
      }, {})

    for (const [i, child] of childrenArr.entries()) {
      const key = child.props?.key
      const currentChild = key
        ? childrenWithKeys[key]?.shift() || null
        : currentChildrenArr[i]

      const renderedElement = renderToDOM(child, currentChild)
      instance.append(renderedElement.element)
      fiberNode.props.children.push(renderedElement.fiberNode)
    }
  }

  return {
    fiberNode,
    element: instance,
  }
}
