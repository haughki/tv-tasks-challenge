import { splitTasks } from "../../reducers/helpers"

let doneTasks = [
    {"id":20,"name":"96791dad-5d64-48e7-955c-87a4c3b1f3fa","description":"this time for sure","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-28T05:52:46.776084Z","updated_at":"2017-07-30T04:43:32.853304Z"},
    {"id":28,"name":"367a2aae-83d7-4332-8639-88dcd84be758","description":"chug, chug","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-29T04:30:35.182120Z","updated_at":"2017-07-29T05:04:36.635017Z"},
]

let todoTasks = [
    {"id":36,"name":"280348b0-b051-4450-9b9e-40460922e7eb","description":"don't stop believing","priority":21,"is_complete":false,"user":4,"created_at":"2017-08-01T23:14:42.861737Z","updated_at":"2017-08-02T22:14:54.514149Z"},
    {"id":40,"name":"dd43396f-c39d-4a87-a87c-58b05675e1e6","description":"a brand new","priority":22,"is_complete":false,"user":4,"created_at":"2017-08-02T04:05:05.705850Z","updated_at":"2017-08-02T22:15:06.169809Z"},
    {"id":39,"name":"5a3965a0-3971-4e07-aae6-3a66eb7b28ea","description":"change order now","priority":23,"is_complete":false,"user":4,"created_at":"2017-08-02T00:20:51.959348Z","updated_at":"2017-08-02T22:15:06.168320Z"},
]

let allTasks = [
    {"id":36,"name":"280348b0-b051-4450-9b9e-40460922e7eb","description":"don't stop believing","priority":21,"is_complete":false,"user":4,"created_at":"2017-08-01T23:14:42.861737Z","updated_at":"2017-08-02T22:14:54.514149Z"},
    {"id":40,"name":"dd43396f-c39d-4a87-a87c-58b05675e1e6","description":"a brand new","priority":22,"is_complete":false,"user":4,"created_at":"2017-08-02T04:05:05.705850Z","updated_at":"2017-08-02T22:15:06.169809Z"},
    {"id":39,"name":"5a3965a0-3971-4e07-aae6-3a66eb7b28ea","description":"change order now","priority":23,"is_complete":false,"user":4,"created_at":"2017-08-02T00:20:51.959348Z","updated_at":"2017-08-02T22:15:06.168320Z"},
    {"id":20,"name":"96791dad-5d64-48e7-955c-87a4c3b1f3fa","description":"this time for sure","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-28T05:52:46.776084Z","updated_at":"2017-07-30T04:43:32.853304Z"},
    {"id":28,"name":"367a2aae-83d7-4332-8639-88dcd84be758","description":"chug, chug","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-29T04:30:35.182120Z","updated_at":"2017-07-29T05:04:36.635017Z"},
]

test('empty task list', () => {
    let split = splitTasks([])
    expect(split.done.length).toBe(0);
    expect(split.todo.length).toBe(0);
});

test('all done', () => {
    let split = splitTasks(doneTasks)
    expect(split.done).toBe(doneTasks);
    expect(split.todo.length).toBe(0);
});

test('all todo', () => {
    let split = splitTasks(todoTasks)
    expect(split.done.length).toBe(0);
    expect(split.todo).toBe(todoTasks);
});

test('mix of tasks', () => {
    let split = splitTasks(allTasks)
    expect(split.done).toEqual(doneTasks);
    expect(split.todo).toEqual(todoTasks);
});