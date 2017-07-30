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
            //if(action.task.is_complete) {
                let newTasks = []
                // loop until you find the completed task, copying state.tasks as you go
                let i = 0
                for (i; i < state.tasks.length; i++) {
                    if (state.tasks[i].id === action.task.id) {
                        // store index by breaking loop
                        break;
                    } else {
                        newTasks[i] = state.tasks[i]
                    }
                }
                // loop from completed index to last but one to find the next completed task (if there is one)
                let insertedNewTask = false
                for (i; i < state.tasks.length - 1; i++) {
                    // if next task is not completed
                    if (state.tasks[i + 1].is_complete === false) {
                        // replace current 'empty space' with next
                        newTasks[i] = state.tasks[i + 1]
                    } else {
                        // insert newly completed task into this space
                        newTasks[i] = action.task
                        insertedNewTask = true
                        break
                    }
                }
                i++  // either newly completed task + 1, or the last spot in the list (if there were no completed tasks)
                if (insertedNewTask) {
                    // copy the rest of the tasks
                    for (i; i < state.tasks.length; i++) {
                        newTasks[i] = state.tasks[i]
                    }
                } else { // there were no completed tasks
                   newTasks[i] = action.task
                }
                return { isFetching : false, tasks: newTasks }
            // } else {
            //
            // }
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