/**
 * 组件实现文件
 *
 * 在这里实现你的特效组件
 * 这个文件会被自动读取用于显示代码
 */

import { useState } from "react";
import "./Component.css";

function TransitionList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        { id: Date.now(), text: inputValue, completed: false },
        ...todos,
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="transition-list">
      <h2>待办事项</h2>

      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="输入新事项..."
        />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.completed ? "completed" : ""} ${
              removingId === todo.id ? "removing" : ""
            }`}
            // className={todo.completed ? "completed" : ""}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              删除
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty-tip">暂无待办事项</p>}
    </div>
  );
}

export default TransitionList;
