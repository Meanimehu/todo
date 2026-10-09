
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-todos") || "[]");
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();

    const text = input.trim();
    if (!text) return;

    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), text, completed: false }
    ]);

    setInput("");
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  }

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="app">
      <header>
        <p className="eyebrow">YOUR PERSONAL SPACE</p>
        <h1>My Todos<span>.</span></h1>
        <p className="subtitle">One task at a time.</p>
      </header>

      <form className="add-form" onSubmit={addTodo}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to get done?"
          aria-label="New todo"
          autoFocus
        />
        <button type="submit">Add task</button>
      </form>

      <section className="todo-section">
        <div className="section-heading">
          <h2>Your tasks</h2>
          <span>{remaining} left</span>
        </div>

        {todos.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✓</div>
            <h3>All clear!</h3>
            <p>Add a task above to get started.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? "todo done" : "todo"}
              >
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="custom-check" />
                  <span className="todo-text">{todo.text}</span>
                </label>

                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer>
        Saved on this device · {todos.length} total tasks
      </footer>
    </main>
  );
}

export default App;