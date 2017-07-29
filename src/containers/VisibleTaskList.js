import { connect } from 'react-redux'
import { toggleTaskComplete } from '../actions'
import TaskList from '../components/TaskList'
import { VISIBILITY } from '../common'

const getVisibleTasks = (tasks, filter) => {
    switch (filter) {
        case VISIBILITY.SHOW_ALL:
            return tasks
        case VISIBILITY.SHOW_ACTIVE:
            return tasks.filter(t => !t.completed)
        // TODO default?
    }
}

const mapStateToProps = state => {
    return {
        tasks: getVisibleTasks(state.tasks.tasks, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTaskClick: (id, is_complete, priority) => {
            dispatch(toggleTaskComplete(id, is_complete, priority))
        }
    }
}

const VisibleTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default VisibleTaskList