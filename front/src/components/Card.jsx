import React, { useEffect, useState } from "react";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";

const Card = ({ task, deleteToDo }) => {
    const [completed, setCompleted] = useState(task.completed);
    const [error, setError] = useState(false);

    useEffect(() => {}, [completed]);

    const formatDate = () =>{
        const indexDot = String(task.created_at).indexOf(".")
        const afterDot = String(task.created_at).slice(indexDot,-1)
        return String(task.created_at).replace("T"," ").replace(afterDot,"").replace("Z","")
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const response = await fetch(ENDPOINTS.DELETE_TODO(task.id), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            deleteToDo(task.id);
        }
    };

    const handleComplete = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const response = await fetch(ENDPOINTS.COMPLETE_TODO(task.id), {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        // const data = await response.json()
        if (response.ok) {
            setCompleted(true);
            setError(false);
        } else {
            console.log("Error creando tarea");
            setError(true);
        }
    };

    return (
        <div
            key={task.id}
            className="bg-white/10 p-4 rounded-xl border border-white/10 relative"
        >
            <div className="flex">

            {!completed && (
                <button
                    onClick={handleComplete}
                    className="rounded-xl hover:bg-green-600 mr-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            ) }
            <h3
                className={`font-semibold text-lg ${completed ? "line-through" : ""}`}
            >
                {task.title}
            </h3>
            </div>
            <p className="text-gray-400">{formatDate()}</p>
            
            {error && <p className="text-red-500">Error</p>}
            <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2  rounded-2xl hover:bg-red-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Card;
