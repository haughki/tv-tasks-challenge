
function sortDone(doneTasks) {
    doneTasks.sort(function(a,b){
        return new Date(b.updated_at) - new Date(a.updated_at);  // subtracting in this order should give descending
    });

}
export function splitTasks(tasks) {
    let split = {
        done: [],
        todo: []
    }
    if (tasks.length < 1)
        return split

    if (tasks[0].is_complete) {  // if the first task is complete, then all are
        split.done = tasks
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
    if (split.done.length > 0)
        sortDone(split.done)
    return split;
}

