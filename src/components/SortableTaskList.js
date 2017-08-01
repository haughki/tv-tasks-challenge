import React, { Component } from 'react';
import { sortable } from 'react-sortable';


class ListItem extends Component {
    render() {
        return (
            <div {...this.props} className="task" style={{
                textDecoration: this.props.children.is_complete ? 'line-through' : 'none'
            }}><a href="#" onClick={e => {
                e.preventDefault()
                alert('click!')
            }}>Link</a> {this.props.children.description}</div>
        )
    }
}


let SortableListItem = sortable(ListItem);

class SortableTaskList extends Component {
    constructor(props) {
        super(props)
        this.state = props
    }

    render() {
        let updateState = function(obj) {
            this.setState(obj)
        }.bind(this)
        let childProps = { className: 'myClass1' };
        let listItems = this.state.tasks.map(function(task, i) {
            return (
                <SortableListItem
                    key={task.id}  //id
                    //updateState={obj => this.setState(obj)}
                    updateState={updateState}
                    items={this.state.tasks} // all tasks?
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}  //priority
                    outline="list"
                    childProps={childProps}
                >{task}</SortableListItem>  // description
            );
        }, this);

        return (
            <div className="task-list">{listItems}</div>
        )
    }
}

export default SortableTaskList