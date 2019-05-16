import React from 'react';
import * as R from 'ramda';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { Query } from 'react-apollo';

import { ALL_TODOS } from './Query';
import { UPDATE_TODO, DELETE_TODO, CREATE_TODO } from './Mutation';
import { MutationFactory, QueryFactory } from '../helpers/ApolloFactory'

import { TodosContextProvider, Todo } from './TodosContext';
import { adopt } from 'react-adopt'

const updateTodosCache = (cache: DataProxy, { data: { createTodo } }: FetchResult ) => {
  const query = ALL_TODOS;
  const { todos } = cache.readQuery({ query }) as any;

  cache.writeQuery({
    query,
    data: { todos: R.concat(todos, [createTodo]) },
  })
}

const updateTodoCache = (cache: DataProxy, { data: { updateTodo } }: FetchResult) => {
  const query = ALL_TODOS;
  const { todos } = cache.readQuery({ query }) as any;
  const idx = R.findIndex(R.propEq('id', updateTodo.id), todos);

  cache.writeQuery({
    query,
    data: { todos: R.update(idx, updateTodo, todos) },
  })
}

const deleteTodosCache = (cache: DataProxy, { data: { deleteTodo } }: FetchResult) => {
  const query = ALL_TODOS
  const { todos } = cache.readQuery({ query }) as any;
  const byTodoId = R.propEq('id', deleteTodo.id)

  cache.writeQuery({
    query,
    data: { todos: R.reject(byTodoId, todos) },
  })
}

export const TodosContainer = adopt({
  todos: QueryFactory(ALL_TODOS),
  createTodo: MutationFactory(CREATE_TODO, updateTodosCache),
  updateTodo: MutationFactory(UPDATE_TODO, updateTodosCache),
  deleteTodo: MutationFactory(DELETE_TODO, deleteTodosCache)
})

export const TodosContextResolver = ({...props}) => {
  return (
    <TodosContextProvider value={{
      todos: [{
        id: '1',
        title: 'asdf',
        completed: false
      }],
      activeTodo: undefined,
      createTodo: () => {},
      updateTodo: () => {},
      deleteTodo: () => {}
    }}>
      { props.children }
    </TodosContextProvider>
  )
};

export default TodosContextResolver;