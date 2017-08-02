import { connect } from 'react-redux'
// import { toggleTaskComplete } from '../actions'
import { changeTaskOrder } from '../actions'
import { VISIBILITY } from '../common'
import SortableComponent from '../components/NewSortableTaskList'


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

// const mapDispatchToProps = dispatch => {
//     return {
//         onTaskClick: (id, is_complete, priority) => {
//             dispatch(toggleTaskComplete(id, is_complete, priority))
//         }
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        dispatchChangeTaskOrder: (id, priority) => {
            dispatch(changeTaskOrder(id, priority))
        }
    }
}


const VisibleTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortableComponent)

export default VisibleTaskList