import React from 'react'
import PropTypes from 'prop-types'

const Task = ({ description }) => (
    <li style={{ textDecoration: 'line-through' }}>
        {description}
    </li>
)

Task.propTypes = {
    description: PropTypes.string.isRequired
}

const SimpleTaskList = ({ tasks }) => (
    <ul>
        { tasks.map(task => (
            <Task key={task.id} description={task.description} />
        ))}
    </ul>
)

SimpleTaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
}

export default SimpleTaskList