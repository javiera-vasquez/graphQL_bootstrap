import React from 'react';

import ApolloClient from "apollo-boost";
import { ApolloProvider, QueryResult } from "react-apollo";

import TodosContextProvider from './TodosContextProvider/TodosConsumerProvider'
import { TodosContextConsumer, Todo } from './TodosContextProvider/TodosContext';

import './App.css';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfitlb222zju01860wc988f6'
});

const RenderTodosFromState: React.FC = () => {
  return (
    <TodosContextConsumer>
      {({ todos, activeTodo, getTodos, isLoading, updateTodo, deleteTodo }) => (
        <>
          <button onClick={getTodos}>
            {todos ?  'update todos' : 'get todos'}
          </button>
          { isLoading && <p>Loading…</p> }
          { (todos && !isLoading) && todos.map(({id, title, completed}) => (
            <div
              key={id}
              className={activeTodo === id ? 'active' : ''}
              onClick={() => updateTodo(id, completed)}
            >
              <p>
                {`${title} is completed ? ${completed}`}
                <button onClick={() => deleteTodo(id)}>delete</button>
              </p>
            </div>
          ))}
        </>
      )}
    </TodosContextConsumer>
  )
}

const RenderTodosFromCache: React.FC = () => {
  return <span />
}

// const CreateTodo: React.FC = () => {
//   return (
//     <TodosContextConsumer>
//       {({ todos, activeTodo, updateTodo, deleteTodo }) => {
//         return todos && todos.map(({id, title, completed}) => (
//           <div
//             key={id}
//             className={activeTodo === id ? 'active' : ''}
//             onClick={() => updateTodo(id, completed)}
//           >
//             {`${title} is completed ? ${completed}`}
//             <button onClick={() => deleteTodo(id)}>
//               delete
//             </button>
//           </div>
//         ))
//       }}
//     </TodosContextConsumer>
//   )
// }

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <TodosContextProvider>
          <h3>Todos</h3>
          <RenderTodosFromState />
        </TodosContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
