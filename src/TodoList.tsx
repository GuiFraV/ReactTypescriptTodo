import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = () => {
    if (inputText.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputText.trim(), completed: false },
      ]);
      setInputText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Ma Todo List</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={addTodo}>Ajouter</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
