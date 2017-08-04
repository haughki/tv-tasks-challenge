import React from 'react'
import { connect } from 'react-redux'
import { createTask } from '../actions'

let AddTask = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(createTask(input.value))
                    input.value = ''
                }}
            >
                <input ref={node => { input = node }} />
                <button type="submit">
                    Add Task
                </button>
            </form>
        </div>
    )
}
AddTask = connect()(AddTask)

export default AddTask