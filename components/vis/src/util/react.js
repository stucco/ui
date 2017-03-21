const spreadRelated = (component, props) => {
  let newProps = {}
  for (let p in props) {
    if (p in component.propTypes) {
      newProps[p] = props[p]
    }
  }
  return newProps
}

const spreadExclude = (props, exclude) => {
  let newProps = {}
  for (let p in props) {
    if (!(p in exclude)) {
      newProps[p] = props[p]
    }
  }
  return newProps
}

// Convert DOM attribute to React attribute
const toReactAttribute = (attribute) => {
  // Check for classname
  if (attribute === 'classname') {
    return 'className'
  } else if (/-/.test(attribute)) {
    // Strip out '-' and capitalize each word after the 1st
    return attribute.split('-').map((s, i) => {
      return i > 0
        ? s.charAt(0).toUpperCase() + s.slice(1)
        : s
    }).reduce((acc, curr) => {
      return acc + curr
    }, '')
  } else {
    return attribute
  }
}

const toDOMAttribute = (attribute) => {
  // Check for classname
  if (attribute === 'className') {
    return 'classname'
  } else {
    // Convert camel case to dash
    return attribute.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }
}

export { spreadRelated, spreadExclude, toReactAttribute, toDOMAttribute }
