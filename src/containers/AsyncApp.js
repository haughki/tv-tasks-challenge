import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchTasksIfNeeded,
    invalidate
} from '../actions'
import Tasks from '../components/Tasks'

class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTasksIfNeeded())
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
    //         const { dispatch, selectedSubreddit } = this.props
    //         dispatch(fetchTasksIfNeeded(selectedSubreddit))
    //     }
    // }

    handleChange() {
        this.props.dispatch(fetchTasksIfNeeded())
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(invalidate())
        dispatch(fetchTasksIfNeeded())
    }

    render() {
        const { tasks, isFetching, lastUpdated } = this.props
        return (
            <div>
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>}
                    {!isFetching &&
                    <a href="#" onClick={this.handleRefreshClick}>
                        Refresh
                    </a>}
                </p>
                {isFetching && tasks.length === 0 && <h2>Loading...</h2>}
                {!isFetching && tasks.length === 0 && <h2>Empty.</h2>}
                {tasks.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Tasks tasks={tasks} />
                </div>}
            </div>
        )
    }
}

AsyncApp.propTypes = {
    tasks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {
        isFetching,
        lastUpdated,
        items: tasks
    } = state

    return {
        tasks,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)