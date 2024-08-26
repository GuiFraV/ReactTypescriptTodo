import React, { useState } from "react";

const TodoLou = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  type filterTodo = "all" | "active" | "completed";

  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<filterTodo>("all");

  const handleTextTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleTodos = () => {
    if (todoText.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: todoText, completed: false },
      ]);
      setTodoText("");
    }
  };

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
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

  const handleFilterTodo = (newFilter: filterTodo) => {
    setFilter(newFilter);
  };

  const filteredTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
  });

  return (
    <div>
      <h3>Todo List</h3>
      <input onChange={handleTextTodo} value={todoText}></input>
      <button onClick={handleTodos}>Valider</button>

      <div>
        <button onClick={() => handleFilterTodo("all")}>all</button>
        <button onClick={() => handleFilterTodo("active")}>active</button>
        <button onClick={() => handleFilterTodo("completed")}>completed</button>
      </div>
      <ul>
        {filteredTodo.map((todo) => (
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

export default TodoLou;
