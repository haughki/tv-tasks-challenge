import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateTask} from "../actions"
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'


class TaskEditModal extends Component {
    constructor(props) {
        super(props)
        this.state = props
        this.newTask = undefined
        this.getInitialState = this.getInitialState.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.getValidationState = this.getValidationState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveSandbox = this.saveSandbox.bind(this)
    }

    getInitialState() {
        return { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    getValidationState() {
        // const length = this.state.value.length;
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        // else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    saveSandbox(event){
        console.log("Hello World");
        let name = this.newTask.value
        console.log(name);
    }

    render() {
        // const popover = (
        //     <Popover id="modal-popover" title="popover">
        //         very popover. such engagement
        //     </Popover>
        // );
        // const tooltip = (
        //     <Tooltip id="modal-tooltip">
        //         wow.
        //     </Tooltip>
        // );

        return (
            <div>

                {/*<Button*/}
                    {/*bsStyle="primary"*/}
                    {/*bsSize="large"*/}
                    {/*onClick={this.open}*/}
                {/*>*/}
                    {/*Launch demo modal*/}
                {/*</Button>*/}

                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={e => {
                        e.preventDefault()
                        if (!this.newTask.value.trim()) {
                            return
                        }
                        //dispatch(createTask(newTask.value))
                        this.newTask.value = ''
                    }} >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <FormGroup
                                controlId="formBasicText"
                                validationState={this.getValidationState()}
                            >
                                {/*<ControlLabel>Working example with validation</ControlLabel>*/}
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter text"
                                    onChange={this.handleChange}
                                    inputRef={textInput => { this.newTask = textInput }}
                                />

                                <FormControl.Feedback />
                                <HelpBlock>Edit task description and press Enter.</HelpBlock>
                            </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveSandbox.bind(this)} bsStyle="success">Save</Button>
                        <Button onClick={this.close} >Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            </div>
        );
    }
}

export default TaskEditModal
