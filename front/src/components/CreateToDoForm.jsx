import React, { useState } from "react";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";

const CreateToDoForm = ({ addToDo }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const response = await fetch(ENDPOINTS.CREATE_TODO, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                complete: false,
            }),

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        setError(response.ok);
        const data = await response.json()
        if (response.ok) {
            addToDo(data);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 ">
            <form
                className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all p-2 outline-none"
                onSubmit={handleSubmit}
            >
                <input
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Escribe una nueva tarea..."
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-200 placeholder-gray-400 py-3 px-4 text-base"
                />

                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-black text-white p-2.5 rounded-xl transition-colors flex items-center justify-center"
                    aria-label="Enviar tarea"
                >
                    {/* Icono de flecha estilo "Enviar" */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-3">
                Presiona Enter para añadir a la lista
            </p>
        </div>
    );
};

export default CreateToDoForm;
