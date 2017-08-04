import { combineReducers } from 'redux'
import { VISIBILITY } from "../common"
import { splitTasks } from "./helpers"
import {
    SET_VISIBILITY_FILTER,
    RECEIVE_TASKS,
    DISABLE_UI,
} from '../actions'


function taskVisibility(state = VISIBILITY.HIDE_COMPLETED, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function tasksState(
    state = { disableUi : true,
              tasks: {
                  done: [],
                  todo: []
              }
    },
    action
) {
    switch (action.type) {
        case DISABLE_UI:
            return Object.assign({}, state, {
                disableUi: true,
            })
        case RECEIVE_TASKS:
            return Object.assign({}, state, {
                disableUi: false,
                tasks: splitTasks(action.tasks)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    taskVisibility,
    tasksState
})

export default rootReducer