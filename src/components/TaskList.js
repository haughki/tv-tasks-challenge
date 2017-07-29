import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const TaskList = ({ tasks, onTaskClick }) => (
    <ul>
        {tasks.map(task => (
            <Task key={task.id}
                  is_complete={task.is_complete}
                  description={task.description}
                  onClick={() => onTaskClick(task.id, task.is_complete, task.priority)} />
        ))}
    </ul>
)

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            is_complete: PropTypes.bool.isRequired,
            description: PropTypes.string.isRequired,
            priority: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onTaskClick: PropTypes.func.isRequired
}

export default TaskList