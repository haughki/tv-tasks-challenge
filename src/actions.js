import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

const AUTH_HEADER = new Headers()
AUTH_HEADER.append('Authorization', 'Token 60d6df2d8a5b79de91fa742d66cff90e67a3ed5a')

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestTasks(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receiveTasks(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        tasks: json.results,
        receivedAt: Date.now()
    }
}

function fetchTasks(subreddit) {
    return dispatch => {
        dispatch(requestTasks(subreddit))
        return fetch(`https://api.storn.co/api/v1/task/`, { headers: AUTH_HEADER })
            .then(response => response.json())
            .then(json => dispatch(receiveTasks(subreddit, json)))
    }
}

function shouldFetchTasks(state, subreddit) {
    const tasks = state.tasksBySubreddit[subreddit]
    if (!tasks) {
        return true
    } else if (tasks.isFetching) {
        return false
    } else {
        return tasks.didInvalidate
    }
}

export function fetchTasksIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchTasks(getState(), subreddit)) {
            return dispatch(fetchTasks(subreddit))
        }
    }
}