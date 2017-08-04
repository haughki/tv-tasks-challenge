import React, {Component} from 'react';
import { connect } from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {toggleTaskComplete} from "../actions"


let SortableItem = SortableElement(({task, dispatch}) =>
    <div className="task">
        <input type='checkbox' onClick={e => {
            e.preventDefault()
            dispatch(toggleTaskComplete(task.id, task.priority))  // TODO: should be moved into container -- mapDispatchToProps
        }} />
        {task.description}</div>
);

SortableItem = connect()(SortableItem) // to get the dispatch from redux


const SortableList = SortableContainer(({tasks}) => {
    return (
        <div> { tasks.map((task, index) => (
             <SortableItem key={`item-${index}`} index={index} task={task} />
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

    //onSortEnd = ({oldIndex, newIndex}) => {  // TODO: I feel like the Babel transpiler was complaining about this...?
    onSortEnd({oldIndex, newIndex}) {          // TODO: note the .bind in the ctor.  Roll back?
        if (oldIndex === newIndex)
            return

        let replacingPriority = this.state.tasks[newIndex].priority
        this.state.dispatchChangeTaskOrder(this.state.tasks[oldIndex].id,
            (oldIndex < newIndex) ? replacingPriority + 1 : replacingPriority)
    }

    render() {
        this.state = this.props  // TODO: this works, but somehow doesn't seem right.  Am I breaking a state rule?
        return <SortableList tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}



export default SortableTaskList