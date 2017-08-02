import { combineReducers } from 'redux'
import { VISIBILITY } from "./common"
import {
    SET_VISIBILITY_FILTER,
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_TASK_CREATE,
    RECEIVE_ORDER_CHANGE,
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
        //case RECEIVE_ORDER_CHANGE:
            // tests:
            // move 0 to 0
            // move last to last
            // move 3 to 6
            // move 6 to 3

            // if newIndex === oldIndex
                // log error, break
            // if newIndex < oldIndex (moved something up in list)
                // saved = task at newIndex
                // array at newIndex gets moved task (updated one)
                // loop from newIndex + 1 to end
                    // if current index < oldIndex
                        // temp = saved
                        // saved = a[i]
                        // a[i] = temp
                    // else if current index == oldIndex
                        // replace current index with saved task
                    // else (current index > oldIndex)
                        // increment curr priority + 1

            // else (newIndex > oldIndex -- moved something down in list)
                // loop from oldIndex + 1 to end
                    // if current index < new index
                        // move i to i - 1
                    // else if current index == new index
                        // replace current index with moved task (updated one)
                    // else (current index is > new index
                        // increment the priority + 1

            // return Object.assign({}, state, {
            //     isFetching: false,
            //     tasks: newTasks,
            // })

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
                return Object.assign({}, state, {
                    isFetching: false,
                    tasks: newTasks,
                })
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