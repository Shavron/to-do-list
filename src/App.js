import React, { useState, useEffect } from "react";

function Todo({ index, todo, doAction }) {
  return (
    <div className="course-feature animate-in" id="">
      <p>
        <input
          type="checkbox"
          checked={todo.isCompleted ? true : false}
          onChange={e => doAction("checked", e.target.checked, index)}
        />
        <span
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
            display: "inline"
          }}
        >
          {todo.text}
        </span>
        <button onClick={e => doAction("delete", false, index)}>Delete</button>
      </p>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="todo"
          value={value}
          placeholder="Add task here ..."
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  );
}

function App() {
  const preList = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const [todos, setTodos] = useState(preList);

  useEffect(() => {
    console.log("added......");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const newTodos = [...todos, { text: text, isCompleted: false }];
    console.log(newTodos);
    setTodos(newTodos);
  };
  const handleAction = (action, status, index) => {
    const newTodos = [...todos];
    if (action == "checked") {
      newTodos[index].isCompleted = status;
    }
    if (action == "delete") {
      newTodos.splice(index, 1);
    }
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="title animate-in">
        <h1>To do list ...</h1>
      </div>

      <div className="todo-list" style={{ padding: "20px" }}>
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} doAction={handleAction} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
