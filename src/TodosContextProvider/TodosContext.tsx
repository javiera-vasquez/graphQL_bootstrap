import React from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosContextInterface {
  todos?: Todo[];
  activeTodo?: string;
  createTodo: (title: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

const context = React.createContext<TodosContextInterface>(null as any);

export const TodosContextProvider = context.Provider;
export const TodosContextConsumer = context.Consumer;

// const createTodo = ({ render }) => (
//   <Mutation
//     mutation={CREATE_TODO}
//     update={(cache, { data: { createTodo Todo } }) => {
//       const query = ALL_TODOS
//       const { todos } = cache.readQuery({ query })

//       cache.writeQuery({
//         query,
//         data: { todos: R.concat(todos, [createTodo]) },
//       })
//     }}
//   >
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// )

// const updateTodo = ({ render }) => (
//   <Mutation
//     mutation={UPDATE_TODO}
//     update={(cache, { data: { updateTodo } }) => {
//       const query = ALL_TODOS
//       const { todos } = cache.readQuery({ query })
//       const idx = R.findIndex(R.propEq('id', updateTodo.id), todos)

//       cache.writeQuery({
//         query,
//         data: { todos: R.update(idx, updateTodo, todos) },
//       })
//     }}
//   >
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// )

// const deleteTodo = ({ render }) => (
//   <Mutation
//     mutation={DELETE_TODO}
//     update={(cache, { data: { deleteTodo } }) => {
//       const query = ALL_TODOS
//       const { todos } = cache.readQuery({ query })
//       const byTodoId = R.propEq('id', deleteTodo.id)

//       cache.writeQuery({
//         query,
//         data: { todos: R.reject(byTodoId, todos) },
//       })
//     }}
//   >
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// )