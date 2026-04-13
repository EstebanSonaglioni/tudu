import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";
import Card from "./Card";
import CreateToDoForm from "./CreateToDoForm";
import { useToDos } from "../../hooks/useToDos";
import { ToDoContext } from "./ToDoContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const {toDos} = useContext(ToDoContext);
    
    const handleLogout = (e) => {
        e.preventDefault()
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
            <CreateToDoForm></CreateToDoForm>
            <div className="grid gap-4 grid-cols-4">
                {toDos?.map((toDo) => (
                    <Card
                        toDo={toDo}
                        key={toDo.id}
                    ></Card>
                ))}
                {toDos.length === 0 && (
                    <p>No hay tareas pendientes. ¡Buen trabajo!</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
