import React, { useState } from 'react';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import TodosContextProvider from './TodosContextProvider/TodosConsumerProvider'
import { TodosContextConsumer } from './TodosContextProvider/TodosContext';
import Todo from './Todo';

import './App.css';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfitlb222zju01860wc988f6'
});

enum cases {
  from_state = 'from_state',
  from_cache =  'from_cache'
}

// render the todos list from cb in apollo.client.query
const RenderTodosFromState: React.FC = () => {
  return (
    <TodosContextConsumer>
      {({ todos, activeTodo, getTodos, isLoading, updateTodo, deleteTodo }) => (
        <>
          <button onClick={getTodos}>
            {todos ?  'update todos' : 'get todos'}
          </button>
          { isLoading && <p>Loading…</p> }
          { (todos && !isLoading) && todos.map((todo) => (
            <Todo
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              activeTodo={activeTodo}
              todo={todo}
            />
          ))}
        </>
      )}
    </TodosContextConsumer>
  )
}

// render the todos list from render-props in query apollo comp
const RenderTodosFromCache: React.FC = () => {
  return (
    <TodosContextConsumer>
      { ({ todosQuery: { loading, data }, updateTodo, deleteTodo, activeTodo }) => (
        <>
          { loading && <p>Loading…</p> }
          { !loading && data.todos.map((todo: any) => (
            <Todo
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              activeTodo={activeTodo}
              todo={todo}
            />
          ))}
        </>
      )}
    </TodosContextConsumer>
  )
}

const CreateTodo: React.FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <TodosContextConsumer>
      {({ createTodo }) => {
        const handleAdd = (e: React.SyntheticEvent) => {
          createTodo(input)
          setInput('')
          e.preventDefault()
        }

        return (
          <form onSubmit={handleAdd}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit">add</button>
          </form>
        )
      }}
    </TodosContextConsumer>
  )
}

const App: React.FC = () => {
  const activeCase = cases.from_cache

  const renderComp = (type: cases) => {
    switch(type) {
      case(cases.from_state) :
        return <RenderTodosFromState />
      case(cases.from_cache) :
        return <RenderTodosFromCache />
      default:
        return null
    }
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <TodosContextProvider>
          <h3>Todos</h3>
          { renderComp(activeCase) }
          <CreateTodo />
        </TodosContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
