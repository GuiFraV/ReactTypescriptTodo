import { useState } from "react";

const Todo = () => {
  interface Todo {
    id: number;
    task: string;
    completed: boolean;
  }

  const [todoValue, setTodoValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleText = (e) => {
    setTodoValue(e.target.value);
  };

  const handleTodo = () => {
    setTodos([...todos, { id: Date.now(), task: todoValue, completed: false }]);
    setTodoValue("");
  };

  const deleteTodo = (e, id: number) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const isCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input onChange={(e) => handleText(e)} value={todoValue}></input>
      <button onClick={handleTodo}>Valider</button>
      <ul>
        {todos.map((todo) => (
          <li
            onClick={() => isCompleted(todo.id)}
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.task}
            <button onClick={(e) => deleteTodo(e, todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
