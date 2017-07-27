import fetch from 'isomorphic-fetch'

export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const INVALIDATE = 'INVALIDATE'

const AUTH_HEADER = new Headers()
AUTH_HEADER.append('Authorization', 'Token 60d6df2d8a5b79de91fa742d66cff90e67a3ed5a')


export function invalidate() {
    return {
        type: INVALIDATE
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

function fetchTasks() {
    return dispatch => {
        dispatch(requestTasks())
        return fetch("https://api.storn.co/api/v1/task/", { headers: AUTH_HEADER })
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(json)))
    }
}

function shouldFetchTasks(state) {
    const tasks = state.tasks
    if (!tasks) {
        return true
    } else if (tasks.isFetching) {
        return false
    } else {
        return tasks.didInvalidate
    }
}

export function fetchTasksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState())) {
            return dispatch(fetchTasks())
        }
    }
}