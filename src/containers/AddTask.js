import React from 'react'
import { connect } from 'react-redux'
import { createTask } from '../actions'

let AddTask = ({ disableUi, dispatch }) => {
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
                <input disabled={disableUi} ref={node => { input = node }} />
                <button type="submit">
                    Add Task
                </button>
            </form>
        </div>
    )
}
AddTask = connect()(AddTask)  // TODO: is this ok?  Should I use a container middle-man instead?
                              // TODO: this gives me 'dispatch'.

export default AddTask