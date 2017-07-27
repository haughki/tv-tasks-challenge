import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tasks extends Component {
    render() {
        return (
            <ul>
                {this.props.tasks.map((task, i) => <li key={i}>{task.description}</li>)}
            </ul>
        )
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired
}