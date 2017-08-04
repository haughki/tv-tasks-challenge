import React from 'react'
import { connect } from 'react-redux'
import { createTask } from '../actions'


import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';



let AddTask = ({ disableUi, dispatch }) => {
    let newTask = undefined

    return (
        <Form style={{ padding: "20px 0px"}} inline onSubmit={e => {
            e.preventDefault()
            if (!newTask.value.trim()) {
                return
            }
            dispatch(createTask(newTask.value))
            newTask.value = ''
        }}>
            {' '}
            <FormGroup controlId="formInlineEmail">
                {' '}
                <FormControl disabled={disableUi} inputRef={textInput => { newTask = textInput }} placeholder="Add new task..." />
            </FormGroup>
            {' '}
            <Button disabled={disableUi} type="submit">
                Add Task
            </Button>
        </Form>
    )
}

AddTask = connect()(AddTask)  // TODO: is this ok?  Should I use a container middle-man instead?
                              // TODO: this gives me 'dispatch'.

export default AddTask