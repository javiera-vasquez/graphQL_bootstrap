import React from 'react';
import { ApolloMutationResult } from '../interfaces/Apollo';
import { QueryResult } from 'react-apollo';

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
  setActiveTodo: (id: string) => void;
  createTodo: (title: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  mutationWrappers: { [key: string]: ApolloMutationResult };
}

const context = React.createContext<TodosContextInterface>(null as any);

export const TodosContextProvider = context.Provider;
export const TodosContextConsumer = context.Consumer;
