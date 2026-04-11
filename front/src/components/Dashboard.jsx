import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";
import Card from "./Card";
import CreateToDoForm from "./CreateToDoForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const deleteToDo = (taskId)=>{
    setTasks(tasks.filter((task)=>task.id != taskId))
  }

  const addToDo = (toDo)=>{
    setTasks([...tasks, toDo])
  }

  const fetchTasks = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    try {
      const response = await fetch(ENDPOINTS.GET_TODOS, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error cargando tareas");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    navigate("/login");
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Tareas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Cerrar Sesión
        </button>
      </div>
      <CreateToDoForm addToDo={addToDo}></CreateToDoForm>
      <div className="grid gap-4 grid-cols-4">
        {tasks.map((task) => (
          <Card task={task} key={task.id} deleteToDo={deleteToDo}></Card>
        ))}
        {tasks.length === 0 && <p>No hay tareas pendientes. ¡Buen trabajo!</p>}
      </div>
    </div>
  );
};

export default Dashboard;
