import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchTasks,
    fetchTasksIfNeeded
} from '../actions'
import VisibleTaskList from './VisibleTaskList'
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
        const { isFetching } = this.props.tasks

        let ui = <h2>Loading...</h2>;
        if (!isFetching) {
            ui = (
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <AddTask />
                    <VisibleTaskList />
                    <Footer />
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