//import { combineReducers } from 'redux'
import {
    INVALIDATE,
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_TASK_CREATE
} from './actions'

function tasks(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.tasks,
            })
        case RECEIVE_TASK_CREATE:                // note: we don't need to re-fetch all tasks here.  Just add the newly
            return Object.assign({}, state, {    // created one to the top of the list
                isFetching: false,
                didInvalidate: false,
                items: [
                    action.task,
                    ...state.items,
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