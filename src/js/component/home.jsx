import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const API_URL = "https://playground.4geeks.com/todo/user/yourusername";


  useEffect(() => {
    fetch(API_URL)
      .then((resp) => {
        if (!resp.ok) {
          
          return fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([]),
          });
        }
        return resp.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        }
      })
      .catch((error) => console.error("Error al cargar tareas:", error));
  }, []);

  
  const updateTasksInAPI = (newTasks) => {
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTasks),
    })
      .then((resp) => {
        if (resp.ok) {
          setTasks(newTasks);
        } else {
          console.error("Error al actualizar tareas:", resp.statusText);
        }
      })
      .catch((error) => console.error("Error en la conexión:", error));
  };

  
  const addTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTasks = [...tasks, { label: inputValue, done: false }];
      setTasks(newTasks); 
      updateTasksInAPI(newTasks); 
      setInputValue(""); 
    }
  };

  
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks); 
    updateTasksInAPI(newTasks); 
  };

  
  const clearAllTasks = () => {
    
    const clearedTasks = [];
    setTasks(clearedTasks); 
    updateTasksInAPI(clearedTasks); 
  };

  return (
    <div className="home-container">
      <h1>MI LISTA</h1>
      <input
        type="text"
        placeholder="Añadir tarea..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTask}
      />
      <div className="task-list">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <span>{task.label}</span>
                <button onClick={() => deleteTask(index)}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas, añade tareas aquí</p>
        )}
      </div>
      <button className="clear-btn" onClick={clearAllTasks}>
        Limpiar todas las tareas
      </button>
      <div className="landscape">
        <img
          src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?fit=crop&w=800&q=80"
          alt="Paisaje bonito"
        />
      </div>
    </div>
  );
};

export default Home;

