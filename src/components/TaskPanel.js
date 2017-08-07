import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {toggleTaskComplete, deleteTask} from "../actions"
import '../index.css'
import trashCan from '../img/trashCan.png'
import edit from '../img/edit.PNG'


let TaskPanel = ({ dispatch, childClass, disableUi, task, checked }) => (
    <div className="panel panel-default" style={{ marginBottom: '0px' }} >
        <div className={`panel-body ${childClass}`} style={{ padding: '5px 10px 5px 30px' }} onDoubleClick={ e => {
            e.preventDefault()
            alert("you double clicked the task -- this could launch edit modal") }}>
            <div className="checkbox" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <input disabled={disableUi} checked={checked} readOnly type='checkbox' value="on" onClick={e => {
                    e.preventDefault()
                    dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
                }} />
            </div>
            {task.description}


            <input style={{float:"right", paddingLeft: "10px"}} type="image" src={trashCan} alt="delete" onClick={e => {
                e.preventDefault()

                dispatch(deleteTask(task.id))  // TODO: should be moved into container -- mapDispatchToProps
            }} />

            <input style={{float:"left", paddingRight: "10px"}} type="image" src={edit} alt="edit" onClick={e => {
                e.preventDefault()
                alert("You clicked edit.")
                //dispatch(deleteTask(task.id))  // TODO: should be moved into container -- mapDispatchToProps
            }} />

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