
import * as R from 'ramda';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

import { ALL_TODOS } from './Query';
// import { Todo } from './TodosContext';

export const createTodoCache = (cache: DataProxy, { data: { createTodo } }: FetchResult ) => {
  const query = ALL_TODOS;
  const { todos } = cache.readQuery({ query }) as any;

  cache.writeQuery({
    query,
    data: { todos: R.concat(todos, [createTodo]) },
  })
}

export const updateTodoCache = (cache: DataProxy, { data: { updateTodo } }: FetchResult) => {
  const query = ALL_TODOS;
  const { todos } = cache.readQuery({ query }) as any;
  const idx = R.findIndex(R.propEq('id', updateTodo.id), todos);

  cache.writeQuery({
    query,
    data: { todos: R.update(idx, updateTodo, todos) },
  })
}

export const deleteTodosCache = (cache: DataProxy, { data: { deleteTodo } }: FetchResult) => {
  const query = ALL_TODOS
  const { todos } = cache.readQuery({ query }) as any;
  const byTodoId = R.propEq('id', deleteTodo.id)

  cache.writeQuery({
    query,
    data: { todos: R.reject(byTodoId, todos) },
  })
}