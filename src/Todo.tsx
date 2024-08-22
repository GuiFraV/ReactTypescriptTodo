import React, { useState } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const handleTodo = () => {
    if (todoValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), task: todoValue, completed: false },
      ]);
      setTodoValue("");
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

  return (
    <div>
      <input onChange={handleText} value={todoValue} />
      <button onClick={handleTodo}>Ajouter</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => isCompleted(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task}
            <button onClick={(e) => deleteTodo(e, todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
