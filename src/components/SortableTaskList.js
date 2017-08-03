import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
    <li>{value}</li>
);

const SortableList = SortableContainer(({tasks}) => {
    return (
        <ul> { tasks.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value.description} />
        ))}
        </ul>
    );
});

class SortableTaskList extends Component {
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
        this.state = this.props
        return <SortableList tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}

export default SortableTaskList