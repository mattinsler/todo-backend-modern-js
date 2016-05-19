import { view } from '@mattinsler/garnish';

const { mongodb } = APP;
const Todo = mongodb.createModel('todos');

const TodoView = {
  id: '!_id',
  url: ({ _id }, req) => `http://${req.get('host')}/todos/${_id}`
};

class TodosRoute {
  @view(TodoView)
  index(req) {
    return Todo.array();
  }

  @view(TodoView)
  create({ body }) {
    return Todo.create({ completed: false, ...body });
  }

  clear() {
    return Todo.remove({ override: true });
  }

  @view(TodoView)
  get({ params: { id } }) {
    return Todo.where({ _id: Todo.ObjectID(id) }).first();
  }

  @view(TodoView)
  async patch({ body, params: { id } }) {
    const query = Todo.where({ _id: Todo.ObjectID(id) });
    await query.update({ $set: body });
    return query.first();
  }

  destroy({ params: { id } }) {
    return Todo.where({ _id: Todo.ObjectID(id) }).remove();
  }
}

export default TodosRoute;
