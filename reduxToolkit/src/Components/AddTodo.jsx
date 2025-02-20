import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/Todo/todoSlice.js";

function AddTodo({ todoText, isEditable }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditable) {
      setInput(todoText.text);
    } else {
      setInput("");
    }
  }, [isEditable, todoText]);

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  const updateTodoHandler = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ text: input, id: todoText.id }));
    setInput("");
  };

  return (
    <form onSubmit={isEditable ? updateTodoHandler : addTodoHandler} className="flex space-x-2 mt-12 ml-3">
      <input
        type="text"
        className="bg-gray-800 rounded-md border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className={`text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-bold ${isEditable ? "px-3 py-0" : ""}`}
      >
        {isEditable ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AddTodo;