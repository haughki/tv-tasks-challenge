import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchTasks,
    fetchTasksIfNeeded
} from '../actions'
import ToDoTaskList from './ToDoTaskList'
import DoneTaskList from './DoneTaskList'
import AddTask from "./AddTask"
import VisibilityButton from "./VisibilityButton"
import { VISIBILITY } from "../common"
import 'bootstrap/dist/css/bootstrap.css';
import TaskEditModal from '../components/TaskEditModal'

class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTasks())
    }

    // TODO: do I still need this method?
    handleChange() {
        this.props.dispatch(fetchTasksIfNeeded())
    }

    render() {
        const { taskVisibility, disableUi } = this.props

        return (
            <div style={{ opacity: disableUi ? 0.5 : 1, padding: "30px" }}>
                <TaskEditModal/>
                <AddTask disableUi={disableUi} />
                <ToDoTaskList />
                <VisibilityButton />
                { taskVisibility === VISIBILITY.SHOW_COMPLETED &&  // true && expression always evaluates to expression
                <DoneTaskList /> }
            </div>
        )
    }
}

// TODO: clean up the proptypes for this component when things have stabilized.  The following gives you and idea.
// TaskList.propTypes = {
//     tasks: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             is_complete: PropTypes.bool.isRequired,
//             description: PropTypes.string.isRequired
//         }).isRequired
//     ).isRequired,
//     onTaskClick: PropTypes.func.isRequired
// }

// AsyncApp.propTypes = {
//     tasks: PropTypes.object.isRequired,
//     dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
    const { taskVisibility } = state
    const { disableUi } = state.tasksState
    return {
        taskVisibility,
        disableUi,
    }
}

export default connect(mapStateToProps)(AsyncApp)