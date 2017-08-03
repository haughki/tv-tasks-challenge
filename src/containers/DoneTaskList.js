import { connect } from 'react-redux'
import { VISIBILITY } from '../common'
import SimpleTaskList from '../components/SimpleTaskList'


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
        tasks: state.tasksState.tasks.done
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         dispatchChangeTaskOrder: (id, priority) => {
//             dispatch(changeTaskOrder(id, priority))
//         }
//     }
// }


const DoneTaskList = connect(
    mapStateToProps
)(SimpleTaskList)

export default DoneTaskList