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
    // state = {
    //     tasks: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    // };
    constructor(props) {
        super(props)
        this.state = props
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            tasks: arrayMove(this.state.tasks, oldIndex, newIndex),
        });
    };
    render() {
        return <SortableList tasks={this.state.tasks} onSortEnd={this.onSortEnd} />;
    }
}

export default SortableComponent
//render(<SortableComponent/>, document.getElementById('root'));