import React from 'react';
import * as R from 'ramda';

import { ALL_TODOS } from './Query';
import { UPDATE_TODO, DELETE_TODO, CREATE_TODO } from './Mutation';

import { TodosContextProvider, Todo } from './TodosContext';


// export const TodosContainer = adopt({
//   todos: <Query query={ALL_TODOS} />,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// })

export const TodosContextResolver = ({...props}) => (
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
);

export default TodosContextResolver;