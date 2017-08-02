import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
    <li>{value}</li>
);

let theMapper = function(value, index) {
    let ind = index
    let val = value
    return (<SortableItem key={`item-${index}`} index={index} value={value.description} />)
}
const SortableList = SortableContainer(({tasks}) => {
    return (
        <ul>
            {
                tasks.map((value, index) => theMapper(value, index)
                    // (value, index) => (
                    //     <SortableItem key={`item-${index}`} index={index} value={value} />
                    // )
                )
            }
        </ul>
    );
});

class SortableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = props
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) {
            return
        }
        let replacingPriority = this.state.tasks[newIndex].priority
        this.state.dispatchChangeTaskOrder(this.state.tasks[oldIndex].id,
            (oldIndex < newIndex) ? replacingPriority + 1 : replacingPriority)
    }

    render() {
        this.state = this.props
        return <SortableList tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}

export default SortableComponent