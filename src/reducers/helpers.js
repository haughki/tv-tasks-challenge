export function splitTasks(tasks) {
    let split = {
        done: [],
        todo: []
    }
    if (tasks.length < 1)
        return split

    if (tasks[0].is_complete) {  // if the first task is complete, then all are
        split.done = tasks
        // TODO: sort?
    } else if (tasks[tasks.length - 1].is_complete === false) {  // if the last task is not complete, then all are
        split.todo = tasks
    } else {
        for (const task of tasks) {
            if (task.is_complete)
                split.done.push(task)
            else
                split.todo.push(task)
        }
    }

    return split;
}