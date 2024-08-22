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

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const isCompleted = () => {};

  return (
    <div>
      <input onChange={(e) => handleText(e)} value={todoValue}></input>
      <button onClick={handleTodo}>Valider</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
