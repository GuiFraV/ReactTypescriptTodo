import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilteredTodo = "all" | "actif" | "completed";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [filter, setFilter] = useState<FilteredTodo>("all");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const addTodo = () => {
    if (inputText.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputText, completed: false },
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

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilterTodo = (newFilter: FilteredTodo) => {
    setFilter(newFilter);
  };

  const filteredTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "actif") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Ajouter une tâche"
      />
      <button onClick={addTodo}>Ajouter</button>

      <div>
        <button onClick={() => handleFilterTodo("all")}>All</button>
        <button onClick={() => handleFilterTodo("actif")}>Actif</button>
        <button onClick={() => handleFilterTodo("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTodo.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={(e) => deleteTodo(e, todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
