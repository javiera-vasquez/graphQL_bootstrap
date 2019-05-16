import React from 'react';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import TodosContextProvider from './TodosContextProvider/TodosConsumerProvider'
import { TodosContextConsumer } from './TodosContextProvider/TodosContext';

import './App.css';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfitlb222zju01860wc988f6'
});

const TodosConsumer: React.FC = () => {
  return (
    <TodosContextConsumer>
      { ({ todos, activeTodo }) => {
        console.log({ todos, activeTodo })
        return <span>Algun todo</span>
      }}
    </TodosContextConsumer>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider
        client={client}
      >
        <TodosContextProvider>
          <h3>Todos</h3>
          <TodosConsumer />
        </TodosContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
