import React, { useState } from "react";

const FromTodo = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  type FilteredTodo = "all" | "actifs" | "completed";

  const [textInput, setTextInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilteredTodo>("all");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleTodo = () => {
    if (textInput !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: textInput, completed: false },
      ]);
    }
    console.log(todos);
    setTextInput("");
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

  const handleFilterChange = (newFilter: FilteredTodo) => {
    setFilter(newFilter);
  };

  const filteredTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "actifs") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  return (
    <div>
      <input onChange={(e) => handleInput(e)} value={textInput}></input>
      <button onClick={handleTodo}>Valider</button>

      <div>
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("actifs")}>Actifs</button>
        <button onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
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

export default FromTodo;
