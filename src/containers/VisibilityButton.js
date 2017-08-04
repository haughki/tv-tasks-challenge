import { connect } from 'react-redux'
import { VISIBILITY } from "../common"
import { setTaskVisibility } from '../actions'
import CompletedButton from '../components/CompletedButton'


const mapStateToProps = (state) => {
    return {
        text: state.taskVisibility === VISIBILITY.SHOW_COMPLETED ? "HIDE COMPLETED TASKS" : "SHOW COMPLETED TASKS",
        disableUi: state.tasksState.disableUi
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (taskVisibility) => {
            dispatch(setTaskVisibility(taskVisibility))
        }
    }
}

const VisibilityButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletedButton)

export default VisibilityButton