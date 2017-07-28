import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchTasks,
    fetchTasksIfNeeded
} from '../actions'
import Tasks from '../components/Tasks'
import AddTask from "./AddTask"

class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTasks())
    }

    handleChange() {
        this.props.dispatch(fetchTasksIfNeeded())
    }

    render() {
        const { tasks, isFetching } = this.props

        let ui = <h2>Loading...</h2>;
        if (!isFetching) {
            ui = (
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <AddTask />
                    <Tasks tasks={tasks} />
                </div>
            )
        }

        return ui
    }
}

AsyncApp.propTypes = {
    tasks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {
        isFetching,
        tasks
    } = state

    return {
        tasks,
        isFetching,
    }
}

export default connect(mapStateToProps)(AsyncApp)