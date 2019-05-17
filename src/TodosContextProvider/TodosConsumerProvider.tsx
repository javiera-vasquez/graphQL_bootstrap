import React, { useState } from 'react';
import { adopt } from 'react-adopt'

import { ALL_TODOS } from './Query';
import { UPDATE_TODO, DELETE_TODO, CREATE_TODO } from './Mutation';
import { MutationFactory, QueryFactory, ApolloConsumerFactory } from '../helpers/ApolloFactory'
import { createTodoCache, updateTodoCache, deleteTodosCache } from './cache'
import { TodosContextProvider, Todo } from './TodosContext';
import { ApolloMutationResult, ApolloQueryResult } from '../interfaces/Apollo';

interface adoptMapProvider {
  apolloClient: any;
  todosQuery?: ApolloQueryResult;
  createTodo: ApolloMutationResult;
  updateTodo: ApolloMutationResult;
  deleteTodo: ApolloMutationResult;
}

const TodosContainer = adopt({
  apolloClient: ApolloConsumerFactory(),
  createTodo: MutationFactory(CREATE_TODO, createTodoCache),
  updateTodo: MutationFactory(UPDATE_TODO, updateTodoCache),
  deleteTodo: MutationFactory(DELETE_TODO, deleteTodosCache),
  todosQuery: QueryFactory({ query: ALL_TODOS })
})

export const TodosContextResolver = ({...props}) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [activeTodo, setActiveTodo] = useState<string | undefined>(undefined);
  const [mutationStatus, setMutationStatus] = useState<boolean>(false);

  return (
    <TodosContainer>
      {({ apolloClient, createTodo, updateTodo, deleteTodo, todosQuery }: adoptMapProvider) => {

        const handleComplete = async (id: string, completed: boolean) => {
          setMutationStatus(true)
          await updateTodo.mutation({
            variables: { id, completed: !completed }
          })
          setMutationStatus(false)
        }

        const handleRemove = async (id: string) => {
          setMutationStatus(true)
          await deleteTodo.mutation({ variables: { id } })
          setMutationStatus(false)
        }

        const handleCreate = async (title: string) => {
          setMutationStatus(true)
          await createTodo.mutation({ variables: { title } })
          setMutationStatus(false)
        }

        const getTodos = async () => {
          setMutationStatus(true);
          const { data: { todos } } = await apolloClient.query({
            query: ALL_TODOS
          });
          setTodos(todos as Todo[])
          setMutationStatus(false)
        }

        return (
          <TodosContextProvider value={{
            todos,
            getTodos,
            activeTodo,
            todosQuery,
            isLoading: mutationStatus,
            setActiveTodo: (id: string) => setActiveTodo(id),
            createTodo: handleCreate,
            updateTodo: handleComplete,
            deleteTodo: handleRemove,
            mutationWrappers: { createTodo, updateTodo, deleteTodo }
          }}>
            { props.children }
          </TodosContextProvider>
        )
      }}
    </TodosContainer>
  )
};

export default TodosContextResolver;