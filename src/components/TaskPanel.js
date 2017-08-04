import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {toggleTaskComplete} from "../actions"
import '../index.css'

let TaskPanel = ({ dispatch, childClass, disableUi, task, checked }) => (
    <div className={`panel panel-default ${childClass}`} style={{ marginBottom: '0px' }}>
        <div className="panel-body" style={{ padding: '5px 15px' }}>
            <input disabled={disableUi} checked={checked} readOnly type='checkbox' onClick={e => {
                e.preventDefault()
                dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
            }} />
            {task.description}
        </div>
    </div>
)

// TODO: clean up propTypes
// Task.propTypes = {
//     tasks: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             description: PropTypes.string.isRequired,
//         }).isRequired
//     ).isRequired,
// }

TaskPanel = connect()(TaskPanel) // to get the dispatch from redux

export default TaskPanel