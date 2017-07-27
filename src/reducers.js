//import { combineReducers } from 'redux'
import {
    INVALIDATE,
    REQUEST_TASKS,
    RECEIVE_TASKS
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
        default:
            return state
    }
}

const rootReducer = tasks
// const rootReducer = combineReducers({
//     tasksBySubreddit,
// })

export default rootReducer