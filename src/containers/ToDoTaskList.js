import { connect } from 'react-redux'
import { changeTaskOrder } from '../actions'
import { VISIBILITY } from '../common'
import SortableTaskList from '../components/SortableTaskList'


// const getVisibleTasks = (tasks, filter) => {
//     switch (filter) {
//         case VISIBILITY.SHOW_ALL:
//             return tasks
//         case VISIBILITY.SHOW_ACTIVE:
//             return tasks.filter(t => !t.completed)
//         // TODO default?
//     }
// }

const mapStateToProps = state => {
    return {
        tasks: state.tasksState.tasks.todo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchChangeTaskOrder: (id, priority) => {
            dispatch(changeTaskOrder(id, priority))
        }
    }
}


const ToDoTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortableTaskList)

export default ToDoTaskList