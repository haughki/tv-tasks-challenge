import React, {Component} from 'react';
import { connect } from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {toggleTaskComplete} from "../actions"


let SortableItem = SortableElement(({disableUi, task, dispatch}) =>
    <div className="task">
        <input disabled={disableUi} type='checkbox' onClick={e => {
            e.preventDefault()
            dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
        }} />
        {task.description}</div>
);

SortableItem = connect()(SortableItem) // to get the dispatch from redux


const SortableList = SortableContainer(({disableUi, tasks}) => {
    return (
        <div> { tasks.map((task, index) => (
             <SortableItem key={`item-${index}`} disabled={disableUi} disableUi={disableUi} index={index} task={task} />
        ))}
        </div>
    );
});

export class SortableTaskList extends Component {
    constructor(props) {
        super(props)
        this.state = props
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd({oldIndex, newIndex}) {
        if (oldIndex === newIndex)
            return

        let replacingPriority = this.state.tasks[newIndex].priority
        this.state.dispatchChangeTaskOrder(this.state.tasks[oldIndex].id,
            (oldIndex < newIndex) ? replacingPriority + 1 : replacingPriority)
    }

    render() {
        this.state = this.props  // TODO: this works, but somehow doesn't seem right.  Am I breaking a state rule?
        return <SortableList disableUi={this.state.disableUi} tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}



export default SortableTaskList