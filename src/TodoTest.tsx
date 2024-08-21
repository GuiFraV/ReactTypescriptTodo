import React, { useState } from "react";

const TodoTest = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const handleTodo = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, text: todoInput, completed: false },
    ]);
    setTodoInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input onChange={(e) => handleInput(e)} value={todoInput}></input>
      <button onClick={handleTodo}>Valider</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoTest;
