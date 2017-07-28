import fetch from 'isomorphic-fetch'
import uuidv4 from 'uuid/v4'

export const REQUEST_TASK_CREATE = 'REQUEST_TASK_CREATE'
export const RECEIVE_TASK_CREATE = 'RECEIVE_TASK_CREATE'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'

const AUTH_HEADER = new Headers()
AUTH_HEADER.append('Authorization', 'Token 60d6df2d8a5b79de91fa742d66cff90e67a3ed5a')


function requestTaskCreate() {
    return {
        type: REQUEST_TASK_CREATE,
    }
}

function receiveTaskCreate(json) {
    return {
        type: RECEIVE_TASK_CREATE,
        task: json
    }
}

export function createTask(text) {
    AUTH_HEADER.append("Content-Type", "application/json")
    return dispatch => {
        dispatch(requestTaskCreate())
        return fetch("https://api.storn.co/api/v1/task/", {
            method: "POST",
            headers: AUTH_HEADER,
            body: JSON.stringify({
                "name": uuidv4(),  // TODO not sure if we really need this?  Maybe duplicate names are just fine...
                "is_complete": false,
                "description": text,
                "priority": 1
            })})
            .then(response => response.json())
            .then(json => dispatch(receiveTaskCreate(json)))
    }
}

function requestTasks() {
    return {
        type: REQUEST_TASKS
    }
}

function receiveTasks(json) {
    return {
        type: RECEIVE_TASKS,
        tasks: json.results,
    }
}

export function fetchTasks() {
    return dispatch => {
        dispatch(requestTasks())
        return fetch("https://api.storn.co/api/v1/task/", { headers: AUTH_HEADER })
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(json)))
    }
}

function shouldFetchTasks(state) {
    return !state.isFetching
}

export function fetchTasksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState())) {
            return dispatch(fetchTasks())
        }
    }
}