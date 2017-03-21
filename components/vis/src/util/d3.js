import * as d3Scale from 'd3-scale'

const setScale = (scaleType) => {
  if (!scaleType) {
    console.error('scaleType was not defined')
  }
  let scaling = 'scale' + scaleType.charAt(0).toUpperCase() + scaleType.slice(1)
  let scale = d3Scale[scaling]()
  scale.type = scaleType
  if (scale.type === 'pow') {
    scale.exponent(0.5)
  }
  return scale
}

export const isOrdinalScale = (scaleType) => {
  return scaleType === 'band' || scaleType === 'point' || scaleType === 'ordinal'
}

import * as d3Ease from 'd3-ease'

const setEase = (easeType) => {
  let easing = 'ease' + easeType.charAt(0).toUpperCase() + easeType.slice(1)
  return d3Ease[easing]
}

import * as d3Axis from 'd3-axis'

const setAxis = (orientationType) => {
  let orientation = 'axis' + orientationType.charAt(0).toUpperCase() + orientationType.slice(1)
  return d3Axis[orientation]()
}

export { setScale, setEase, setAxis }
