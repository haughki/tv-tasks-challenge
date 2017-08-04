import { connect } from 'react-redux'
import { changeTaskOrder } from '../actions'
import SortableTaskList from '../components/SortableTaskList'


const mapStateToProps = state => {
    return {
        tasks: state.tasksState.tasks.todo,
        disableUi: state.tasksState.disableUi
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