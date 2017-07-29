import { combineReducers } from 'redux'
import { VISIBILITY } from "./common"
import {
    SET_VISIBILITY_FILTER,
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_TASK_CREATE,
    RECEIVE_TOGGLE_COMPLETE
} from './actions'


function visibilityFilter(state = VISIBILITY.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function tasks(
    state = { isFetching : true,
              tasks: []
              },
    action
) {
    switch (action.type) {
        case REQUEST_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                tasks: action.tasks,
            })
        case RECEIVE_TASK_CREATE:                // note: we don't need to re-fetch all tasks here.  Just add the newly
            return Object.assign({}, state, {    // created one to the top of the list
                isFetching: false,
                tasks: [
                    action.task,
                    ...state.tasks,
                ],
            })
        case RECEIVE_TOGGLE_COMPLETE:
            // let newTasks = []
            // let tasks = state.tasks
            // for (let i = 0)
            // for (let i = action.old_priority - 1; i < tasks.length; i++) {
            //
            // }
            return Object.assign({}, state, {
                isFetching: false,
                tasks:  state.tasks.map(task =>                  // for each task
                (task.id === action.task.id)                     // if the task id equals the action id
                    ? {...task, is_complete: !task.is_complete}  // return everything in the task as is, except toggle is_complete
                    : task                                       // else, just return the task
                )
            })
        default:
            return state
    }
}

//const rootReducer = tasks
const rootReducer = combineReducers({
    visibilityFilter,
    tasks
})

export default rootReducer