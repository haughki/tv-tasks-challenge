import { combineReducers } from 'redux'
import { VISIBILITY } from "../common"
import { splitTasks } from "./helpers"
import {
    SET_VISIBILITY_FILTER,
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_TOGGLE_COMPLETE
} from '../actions'


function visibilityFilter(state = VISIBILITY.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function tasksState(
    state = { isFetching : true,
              tasks: {
                  done: [],
                  todo: []
              }
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
                tasks: splitTasks(action.tasks)
            })
        case RECEIVE_TOGGLE_COMPLETE:
            break
        default:
            return state
    }
}

const rootReducer = combineReducers({
    visibilityFilter,
    tasksState
})

export default rootReducer