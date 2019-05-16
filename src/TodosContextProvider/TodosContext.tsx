import React from 'react';
import { Query, Mutation } from 'react-apollo';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosContextInterface {
  todos: Query;
  isLoading: boolean;
  activeTodo: string | undefined;
  setActiveTodo: (id: string) => void;
  createTodo: (title: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  mutationWrappers: { [key: string]: Mutation };
}

const context = React.createContext<TodosContextInterface>(null as any);

export const TodosContextProvider = context.Provider;
export const TodosContextConsumer = context.Consumer;
