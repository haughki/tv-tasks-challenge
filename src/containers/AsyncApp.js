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
import Footer from "../components/Footer"


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
        const { isFetching } = this.props

        let ui = <h2>Loading...</h2>;
        if (!isFetching) {
            ui = (
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <AddTask />
                    <ToDoTaskList />
                    <Footer />
                    <DoneTaskList />
                </div>
            )
        }

        return ui
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

AsyncApp.propTypes = {
    tasks: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { isFetching, tasks } = state.tasksState  // TODO: do I really need to return tasks here?
    return {
        tasks,
        isFetching,
    }
}

export default connect(mapStateToProps)(AsyncApp)