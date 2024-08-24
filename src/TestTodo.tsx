import React, { useState } from "react";

const TestTodo = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  type filtered = "all" | "active" | "completed";

  const [textTodo, setTextTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodo, setFilteredTodo] = useState<filtered>("all");

  const handleTextTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTodo(e.target.value);
  };

  const handleTodo = () => {
    if (textTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: textTodo, completed: false },
      ]);
      setTextTodo("");
    }
  };

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilterTodo = (newFilter: filtered) => {
    setFilteredTodo(newFilter);
  };

  const isCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const todoFilter = todos.filter((todo) => {
    if (filteredTodo === "all") return true;
    if (filteredTodo === "active") return !todo.completed;
    if (filteredTodo === "completed") return todo.completed;
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTodo();
    }
  };

  return (
    <div>
      <h3>TestTodo</h3>
      <input
        onKeyDown={handleKeyDown}
        onChange={handleTextTodo}
        value={textTodo}
      ></input>
      <button onClick={handleTodo}>Valider</button>
      <div>
        <button onClick={() => handleFilterTodo("all")}>all</button>
        <button onClick={() => handleFilterTodo("active")}>active</button>
        <button onClick={() => handleFilterTodo("completed")}>completed</button>
      </div>
      <ul>
        {todoFilter.map((todo) => (
          <li
            key={todo.id}
            onClick={() => isCompleted(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={(e) => deleteTodo(e, todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestTodo;
