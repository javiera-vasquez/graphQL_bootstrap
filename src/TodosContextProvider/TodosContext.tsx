import React from 'react';
import { ApolloMutationResult, ApolloQueryResult } from '../interfaces/Apollo';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosContextInterface {
  todos: Todo[] | null;
  getTodos: () => void;
  isLoading: boolean;
  activeTodo: string | undefined;
  todosQuery: ApolloQueryResult;
  setActiveTodo: (id: string) => void;
  createTodo: (title: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  mutationWrappers: { [key: string]: ApolloMutationResult };
}

const context = React.createContext<TodosContextInterface>(null as any);

export const TodosContextProvider = context.Provider;
export const TodosContextConsumer = context.Consumer;
