import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {toggleTaskComplete} from "../actions"

let Task = ({ task, dispatch }) => (
    <div style={{ textDecoration: 'line-through' }}>
        <input checked readOnly type='checkbox' onClick={e => {
            e.preventDefault()
            dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
        }} />

        {task.description}
    </div>
)
Task = connect()(Task) // to get the dispatch from redux

Task.propTypes = {
    task: PropTypes.object.isRequired,
}

const SimpleTaskList = ({ tasks }) => (
    <div>
        { tasks.map(task => (
            <Task key={task.id} task={task} />
        ))}
    </div>
)

// TODO: clean up propTypes
SimpleTaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
}

export default SimpleTaskList