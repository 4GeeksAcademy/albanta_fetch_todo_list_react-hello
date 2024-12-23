import React, { useEffect, useState } from "react";


const getTodos = async () => {
  const response = await fetch('https://playground.4geeks.com/todo/users/Albanta', { method: 'GET' });
  if (!response.ok){
    crearAlbanta()
  }
  else {
    const { todos } = await response.json();
    return todos;
  } 
};


const addTodo = async (label) => {
  const response = await fetch('https://playground.4geeks.com/todo/todos/Albanta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_done: false, label }),
  });
  const todo = await response.json();
  return todo;
};


const deleteTodo = async (id) => {
  await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
    method: 'DELETE',
  });
};

const crearAlbanta = async () => {
  const response = await fetch('https://playground.4geeks.com/todo/users/Albanta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data) {
    const todoList = await getTodos();
    setTasks(todoList);
  }
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    actualizarLista();
  }, []);

 
  const actualizarLista = async () => {
    const todoList = await getTodos();
    setTasks(todoList);
  };

  
  const addTask = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = await addTodo(inputValue);
      setTasks([...tasks, newTask]);
      setInputValue(""); 
    }
  };

 
  const deleteTask = async (id) => {
    await deleteTodo(id);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  
  const clearAllTasks = async () => {
    for (const task of tasks) {
      await deleteTodo(task.id);
    }
    setTasks([]);
  };

  return (
    <div className="container">
      <h1 className="title">LISTA DE TAREAS</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Añadir nueva tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTask}
        />
      </div>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-message">Añade tareas aquí</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.label}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
      <button className="clear-btn" onClick={clearAllTasks}>
        Eliminar todas las tareas
      </button>
    </div>
  );
};

export default Home;
