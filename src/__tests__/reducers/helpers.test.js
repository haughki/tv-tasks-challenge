import { splitTasks } from "../../reducers/helpers"

let doneTasks = [
    {"id":28,"name":"367a2aae-83d7-4332-8639-88dcd84be758","description":"chug, chug","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-29T04:30:35.182120Z","updated_at":"2017-07-29T05:04:36.635017Z"},
    {"id":34,"name":"9c678506-4a4b-49ae-980a-d9ad73d81b9a","description":"another one bites...","priority":null,"is_complete":true,"user":4,"created_at":"2017-08-01T23:11:23.506462Z","updated_at":"2017-08-03T22:54:39.194089Z"},
    {"id":20,"name":"96791dad-5d64-48e7-955c-87a4c3b1f3fa","description":"this time for sure","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-28T05:52:46.776084Z","updated_at":"2017-07-30T04:43:32.853304Z"},
    {"id":31,"name":"3f29c8b3-fbdd-4bfd-9b46-b35b495c7a24","description":"haven't tried this yet","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:22:44.531902Z","updated_at":"2017-08-03T22:54:40.139872Z"},
    {"id":32,"name":"79f1abe1-953b-4896-9ad6-41c8a57856ba","description":"what about this","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:28:12.197033Z","updated_at":"2017-08-03T21:07:07.997312Z"},
]
let doneTasksSorted = [
    {"id":31,"name":"3f29c8b3-fbdd-4bfd-9b46-b35b495c7a24","description":"haven't tried this yet","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:22:44.531902Z","updated_at":"2017-08-03T22:54:40.139872Z"},
    {"id":34,"name":"9c678506-4a4b-49ae-980a-d9ad73d81b9a","description":"another one bites...","priority":null,"is_complete":true,"user":4,"created_at":"2017-08-01T23:11:23.506462Z","updated_at":"2017-08-03T22:54:39.194089Z"},
    {"id":32,"name":"79f1abe1-953b-4896-9ad6-41c8a57856ba","description":"what about this","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:28:12.197033Z","updated_at":"2017-08-03T21:07:07.997312Z"},
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
    {"id":28,"name":"367a2aae-83d7-4332-8639-88dcd84be758","description":"chug, chug","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-29T04:30:35.182120Z","updated_at":"2017-07-29T05:04:36.635017Z"},
    {"id":34,"name":"9c678506-4a4b-49ae-980a-d9ad73d81b9a","description":"another one bites...","priority":null,"is_complete":true,"user":4,"created_at":"2017-08-01T23:11:23.506462Z","updated_at":"2017-08-03T22:54:39.194089Z"},
    {"id":20,"name":"96791dad-5d64-48e7-955c-87a4c3b1f3fa","description":"this time for sure","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-28T05:52:46.776084Z","updated_at":"2017-07-30T04:43:32.853304Z"},
    {"id":31,"name":"3f29c8b3-fbdd-4bfd-9b46-b35b495c7a24","description":"haven't tried this yet","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:22:44.531902Z","updated_at":"2017-08-03T22:54:40.139872Z"},
    {"id":32,"name":"79f1abe1-953b-4896-9ad6-41c8a57856ba","description":"what about this","priority":null,"is_complete":true,"user":4,"created_at":"2017-07-31T23:28:12.197033Z","updated_at":"2017-08-03T21:07:07.997312Z"},
]

test('empty task list', () => {
    let split = splitTasks([])
    expect(split.done.length).toBe(0);
    expect(split.todo.length).toBe(0);
});

test('all done', () => {
    let split = splitTasks(doneTasks)
    expect(split.done).toEqual(doneTasksSorted);
    expect(split.todo.length).toBe(0);
});

test('all todo', () => {
    let split = splitTasks(todoTasks)
    expect(split.done.length).toBe(0);
    expect(split.todo).toBe(todoTasks);
});

test('mix of tasks', () => {
    let split = splitTasks(allTasks)
    expect(split.done).toEqual(doneTasksSorted);
    expect(split.todo).toEqual(todoTasks);
});