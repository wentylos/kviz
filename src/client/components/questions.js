import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Questions extends Component {
  render() {
    return (
      <h3>TODO zobrazeni otazek</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(Questions)
