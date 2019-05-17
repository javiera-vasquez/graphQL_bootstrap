import React from 'react';
import { Todo } from './TodosContextProvider/TodosContext';

interface TodoComp {
  updateTodo: any,
  deleteTodo: any,
  activeTodo: any;
  todo: Todo;
}

const TodoComp = ({
  updateTodo,
  deleteTodo,
  activeTodo,
  todo: { id, title, completed }
}: TodoComp) => (
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
)

export default TodoComp;
