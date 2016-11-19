import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Results extends Component {
  render() {
    return (
      <h3>TODO zobrazeni vysledku</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(Results)
