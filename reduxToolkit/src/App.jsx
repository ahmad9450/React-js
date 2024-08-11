import React, { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo";
import Todos from "./Components/Todos";

function App() {
  const [isEditable, setIsEditable] = useState(false);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    console.log(todoText);
  }, [todoText]);

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="container mx-auto">
        <AddTodo
          isEditable={isEditable}
          todoText={todoText}
        />
        <Todos
          setIsEditable={setIsEditable}
          setTodoText={setTodoText}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
}

export default App;