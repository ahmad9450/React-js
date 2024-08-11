import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/Todo/todoSlice.js";

function Todos({isEditable, setIsEditable, setTodoText }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-4xl text-white font-bold mb-6">Todos</h1>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <span className="text-lg font-medium">{todo.text}</span>
            <div className="flex gap-0.5">
                        <button
              disabled={isEditable}
              onClick={() => {
                setTodoText(todo);
                setIsEditable(true);
              }}
              className="bg-gray-400 text-black text-[13px] font-semibold px-2 py-1 rounded-lg hover:bg-gray-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="bg-red-500 text-white text-[12px] font-semibold px-2 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;