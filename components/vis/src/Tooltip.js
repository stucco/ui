import { functor, getWidth, scrollTop, scrollLeft } from './util/common'

// Based on d3-tip(https://github.com/Caged/d3-tip)

export default class Tooltip {
  constructor () {
    // Init tooltip
    this.tooltip = document.createElement('div')
    this.tooltip.style.display = 'none'
    this.tooltip.style.position = 'absolute'
    this.tooltip.style['box-sizing'] = 'border-box'
    document.body.appendChild(this.tooltip)

    // Set up defaults
    this._html = ''
    this._baseClass = ''
    this._offset = [0, 0]
    this._direction = 'n'
    this._autoDirection = true
    this._useMouseCoordinates = false
  }

  destroy () {
    document.body.removeChild(this.tooltip)
  }

  show (event, ...args) {
    this.tooltip.className = this._baseClass
    this.tooltip.innerHTML = this._html(...args)
    this.tooltip.style.display = 'block'
    let bbox = this.getScreenBBox(event)
    let direction = this._direction
    let coords = {
      top: bbox[direction].y,
      left: bbox[direction].x
    }
    if (this._autoDirection) {
      direction = this.getAutoDirection(bbox, coords)
    }
    if (this._useMouseCoordinates) {
      // NOTE: Currently uses a direction of 'n'
      coords.top = event.pageY + this._offset[0] - this.tooltip.offsetHeight
      coords.left = event.pageX + this._offset[1] - this.tooltip.offsetWidth / 2
    } else {
      coords.top += this._offset[0] + scrollTop()
      coords.left += this._offset[1] + scrollLeft()
    }
    this.tooltip.classList.add(direction)
    this.tooltip.style.top = coords.top + 'px'
    this.tooltip.style.left = coords.left + 'px'
    return this
  }

  hide () {
    this.tooltip.style.display = 'none'
    return this
  }

  html (tooltipFunction) {
    if (!arguments.length) return this._html
    this._html = tooltipFunction

    return this
  }

  direction (d) {
    if (!arguments.length) return this._direction
    this._direction = functor(d)

    return this
  }

  autoDirection (v) {
    if (!arguments.length) return this._autoDirection
    this._autoDirection = v

    return this
  }

  useMouseCoordinates (v) {
    if (!arguments.length) return this._useMouseCoordinates
    this._useMouseCoordinates = v

    return this
  }

  offset (o) {
    if (!arguments.length) return this._offset
    this._offset = functor(o)

    return this
  }

  attr (attr, value) {
    if (arguments.length < 2 && typeof attr === 'string') {
      return this.tooltip.getAttribute('string')
    } else {
      this.tooltip[attr] = functor(value)
      if (attr === 'className') {
        this._baseClass = this.tooltip[attr]
      }
    }
    return this
  }

  style (styl, value) {
    if (arguments.length < 2 && typeof attr === 'string') {
      return this.tooltip.getAttribute('string')
    } else {
      this.tooltip[styl] = functor(value)
    }

    return this
  }

  // NOTE: Currently assumes a default direction of 'N'
  // Mutates coords and return corrected direction
  getAutoDirection (bbox, coords) {
    let dir = 'n'
    if (coords.left < 0) {
      dir += 'e'
      coords.left = bbox[dir].x - bbox.width
      coords.top = bbox[dir].y
    } else if (coords.left + this.tooltip.offsetWidth > getWidth()) {
      dir += 'w'
      coords.left = bbox[dir].x + bbox.width
      coords.top = bbox[dir].y
    }

    if (coords.top < 0) {
      dir = dir.replace('n', 's')
      coords.top += this.tooltip.offsetHeight + bbox.height
    }

    return dir
  }

  getScreenBBox (event = null) {
    if (event === null) {
      return null
    }

    let target = event.target
    let bbox = {}
    let point = target.ownerSVGElement.createSVGPoint()
    let matrix = target.getScreenCTM()
    let tbbox = target.getBBox()
    let width = tbbox.width
    let height = tbbox.height
    bbox.width = width
    bbox.height = height
    let x = tbbox.x
    let y = tbbox.y

    point.x = x
    point.y = y

    bbox.nw = point.matrixTransform(matrix)
    bbox.nw.y -= this.tooltip.offsetHeight
    bbox.nw.x -= this.tooltip.offsetWidth
    point.x += width

    bbox.ne = point.matrixTransform(matrix)
    bbox.ne.y -= this.tooltip.offsetHeight
    point.y += height

    bbox.se = point.matrixTransform(matrix)
    point.x -= width

    bbox.sw = point.matrixTransform(matrix)
    bbox.sw.x -= this.tooltip.offsetWidth
    point.y -= height / 2

    bbox.w = point.matrixTransform(matrix)
    bbox.w.y -= this.tooltip.offsetHeight / 2
    bbox.w.x -= this.tooltip.offsetWidth
    point.x += width

    bbox.e = point.matrixTransform(matrix)
    bbox.e.y -= this.tooltip.offsetHeight / 2
    point.x -= width / 2
    point.y -= height / 2

    bbox.n = point.matrixTransform(matrix)
    bbox.n.x -= this.tooltip.offsetWidth / 2
    bbox.n.y -= this.tooltip.offsetHeight
    point.y += height

    bbox.s = point.matrixTransform(matrix)
    bbox.s.x -= this.tooltip.offsetWidth / 2

    return bbox
  }
}
