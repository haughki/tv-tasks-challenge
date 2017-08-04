import { connect } from 'react-redux'
import SimpleTaskList from '../components/SimpleTaskList'


const mapStateToProps = state => {
    return {
        tasks: state.tasksState.tasks.done,
        disableUi: state.tasksState.disableUi
    }
}

const DoneTaskList = connect(
    mapStateToProps
)(SimpleTaskList)

export default DoneTaskList