import React from 'react'
import TaskPanel from './TaskPanel'
import PropTypes from 'prop-types'

const SimpleTaskList = ({ disableUi, tasks }) => (
    <div>
        { tasks.map(task => (
            <TaskPanel key={task.id} childClass="done-task" disabled={disableUi} task={task} checked />
        ))}
    </div>
)

// TODO: clean up propTypes
// SimpleTaskList.propTypes = {
//     tasks: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             description: PropTypes.string.isRequired,
//         }).isRequired
//     ).isRequired,
// }

export default SimpleTaskList