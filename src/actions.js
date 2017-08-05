import fetch from 'isomorphic-fetch'
import uuidv4 from 'uuid/v4'
import {store} from './containers/Root'  // TODO: is this a good idea?  Do I need to do this just for dispatch?

export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const DISABLE_UI = 'DISABLE_UI'  // happens during any ajax event TODO: rename?
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

const AUTHORIZATION = Object.freeze({ 'Authorization' : 'Token 60d6df2d8a5b79de91fa742d66cff90e67a3ed5a' })
const CONTENT_TYPE = Object.freeze({"Content-Type": "application/json"})
const TASK_API_URL = "https://api.storn.co/api/v1/task/"

const buildUrlWithId = (id => TASK_API_URL + id + "/")



export function setTaskVisibility(filter){
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

function disableUi() {
    return {
        type: DISABLE_UI
    }
}

export function changeTaskOrder(id, priority) {
    return dispatch => {
        dispatch(disableUi())
        return fetch(buildUrlWithId(id), {
            method: "PATCH",
            headers: new Headers(Object.assign({}, AUTHORIZATION, CONTENT_TYPE)),
            body: JSON.stringify({
                "priority": priority
            })})
            .then(handleResponse)
    }
}

export function toggleTaskComplete(id, priority){
    let body = null
    if (priority === null) {
        body = JSON.stringify({
            "is_complete": false,
            "priority": undefined
        })
    } else {
        body = JSON.stringify({
            "is_complete": true,
        })
    }
    return dispatch => {
        dispatch(disableUi())
        return fetch(buildUrlWithId(id), {
            method: "PATCH",
            headers: new Headers(Object.assign({}, AUTHORIZATION, CONTENT_TYPE)),
            body: body
        })
            .then(handleResponse)
    }
}

export function createTask(text) {
    return dispatch => {
        dispatch(disableUi())
        return fetch(TASK_API_URL, {
            method: "POST",
            headers: new Headers(Object.assign({}, AUTHORIZATION, CONTENT_TYPE)),
            body: JSON.stringify({
                "name": uuidv4(),  // TODO not sure if we really need this?  Maybe duplicate names are just fine...
                "is_complete": false,
                "description": text,
                "priority": 1      // TODO newly created task should have highest priortiy in list + 1, not necessarily 1
            })})
            .then(handleResponse)                  // to get the priorities right, we depend on the server.  So, we
    }                                              // need to just re-fetch everything here.
}

function handleResponse(response) {
    if (response.ok)
        store.dispatch(fetchTasks())  // TODO: do I really need store here to access dispatch??
}

export function deleteTask(id) {
    return dispatch => {
        dispatch(disableUi())
        return fetch(buildUrlWithId(id), {
            method: "DELETE",
            headers: new Headers(AUTHORIZATION)
        }).then(handleResponse)
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
        dispatch(disableUi())
        return fetch(TASK_API_URL, { headers: new Headers(AUTHORIZATION) })
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(json)))
    }
}

function shouldFetchTasks(state) {
    return !state.tasksState.disableUi
}

export function fetchTasksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState())) {
            return dispatch(fetchTasks())
        }
    }
}