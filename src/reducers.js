//import { combineReducers } from 'redux'
import {
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_TASK_CREATE
} from './actions'

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
        default:
            return state
    }
}

const rootReducer = tasks
// const rootReducer = combineReducers({
//     tasksBySubreddit,
// })

export default rootReducer