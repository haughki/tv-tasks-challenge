import fetch from 'isomorphic-fetch'
import uuidv4 from 'uuid/v4'

export const REQUEST_TASK_CREATE = 'REQUEST_TASK_CREATE'
export const RECEIVE_TASK_CREATE = 'RECEIVE_TASK_CREATE'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const REQUEST_TOGGLE_COMPLETE = 'REQUEST_TOGGLE_COMPLETE'
export const RECEIVE_TOGGLE_COMPLETE = 'RECEIVE_TOGGLE_COMPLETE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

const AUTHORIZATION = Object.freeze({ 'Authorization' : 'Token 60d6df2d8a5b79de91fa742d66cff90e67a3ed5a' })
const CONTENT_TYPE = Object.freeze({"Content-Type": "application/json"})
const TASK_API_URL = "https://api.storn.co/api/v1/task/"

export function setVisibilityFilter(filter){
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

function requestToggleComplete() {
    return {
        type: REQUEST_TOGGLE_COMPLETE
    }
}

function receiveToggleComplete(json, old_priority) {
    return {
        type: RECEIVE_TOGGLE_COMPLETE,
        task: json,
        old_priority: old_priority
    }
}

export function toggleTaskComplete(id, is_complete, priority){
    let body = null
    if (priority === null) {
        body = JSON.stringify({
            "is_complete": !is_complete,
            "priority": 1
        })
    } else {
        body = JSON.stringify({
            "is_complete": !is_complete,
        })
    }
    return dispatch => {
        dispatch(requestToggleComplete())
        return fetch(TASK_API_URL + "/" + id + "/", {
            method: "PATCH",
            headers: new Headers(Object.assign({}, AUTHORIZATION, CONTENT_TYPE)),
            body: body
        })
            .then(response => response.json())
            .then(json => dispatch(receiveToggleComplete(json, priority)))
    }
}


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
    return dispatch => {
        dispatch(requestTaskCreate())
        return fetch(TASK_API_URL, {
            method: "POST",
            headers: new Headers(Object.assign({}, AUTHORIZATION, CONTENT_TYPE)),
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
        return fetch(TASK_API_URL, { headers: new Headers(AUTHORIZATION) })
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