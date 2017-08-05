import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {toggleTaskComplete, deleteTask} from "../actions"
import '../index.css'
import trashCan from '../img/trashCan.PNG'


let TaskPanel = ({ dispatch, childClass, disableUi, task, checked }) => (
    <div className="panel panel-default" style={{ marginBottom: '0px' }}>
        <div className="panel-body" style={{ padding: '5px 15px' }}>
            <div className="checkbox" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <label className={childClass}>
                    <input disabled={disableUi} checked={checked} readOnly type='checkbox' value="on" onClick={e => {
                        e.preventDefault()
                        dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
                    }} />
                    {task.description}
                </label>
                <input style={{float:"right"}} type="image" src={trashCan} alt="delete" width="14" height="19" onClick={e => {
                    e.preventDefault()
                    dispatch(deleteTask(task.id))  // TODO: should be moved into container -- mapDispatchToProps
                }} />
            </div>

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