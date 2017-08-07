import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import TaskPanel from './TaskPanel'


let SortableItem = SortableElement((props) =>
    <TaskPanel {...props}/>
)

const SortableList = SortableContainer(({disableUi, tasks}) => {
    return (
        <div> { tasks.map((task, index) => (
             <SortableItem key={`item-${index}`} index={index} childClass="todo-task" disabled={disableUi} task={task} />
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
        // TODO: how to get this working so that list immediately updates on sort end?  The this.props assignment
        // TODO: in render() is breaking this, I think.
        // this.setState({
        //     tasks: arrayMove(this.state.tasks, oldIndex, newIndex),
        // })
    }

    render() {
        this.state = this.props  // TODO: this works, but somehow doesn't seem right.  Am I breaking a state rule?
        return <SortableList distance={3} disableUi={this.state.disableUi} tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}



export default SortableTaskList