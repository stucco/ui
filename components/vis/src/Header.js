import React, { PropTypes } from 'react'

class Header extends React.Component {
  render () {
    let { chart, ...props } = this.props
    let containerStyle = {
      style: {
        width: chart.chartWidth,
        marginLeft: chart.props.margin.left,
        marginRight: chart.props.margin.right
      }
    }

    return (
      <div {...containerStyle}>
        {props.components().map((e, i) => {
          let cloneProps = {
            key: i
          }

          // Only pass down chart if it exist as a prop for the component
          if ('chart' in e.props) {
            cloneProps.chart = chart
          }
          return React.cloneElement(e, cloneProps)
        })}
      </div>
    )
  }
}

Header.defaultProps = {
  chart: null
}

Header.propTypes = {
  chart: PropTypes.any,
  components: PropTypes.any
}

export default Header
