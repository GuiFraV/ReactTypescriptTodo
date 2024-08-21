import { useState } from "react";

const TodoTest: React.FC = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, text: todoText, completed: false },
    ]);
    setTodoText("");
  };

  return (
    <div>
      <input onChange={(e) => handleTodo(e)} value={todoText}></input>
      <button onClick={addTodo}>Valider</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoTest;
