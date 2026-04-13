import React, { useContext, useEffect, useState } from "react";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";
import { useToDos } from "../../hooks/useToDos";
import { ToDoContext } from "./ToDoContext";

const Card = ({ toDo }) => {
    const [error, setError] = useState(false);
    const { deleteToDo, compleToDo } = useContext(ToDoContext);

    useEffect(() => {}, [toDo.completed]);

    const formatDate = () =>{
        const indexDot = String(toDo.created_at).indexOf(".")
        const afterDot = String(toDo.created_at).slice(indexDot,-1)
        return String(toDo.created_at).replace("T"," ").replace(afterDot,"").replace("Z","")
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        deleteToDo(toDo.id);
    };

    const handleComplete = async (e) => {
        e.preventDefault();
        compleToDo(toDo)
    };

    return (
        <div
            key={toDo.id}
            className="bg-white/10 p-4 rounded-xl border border-white/10 relative"
        >
            <div className="flex">

            {!toDo.completed && (
                <button
                    onClick={handleComplete}
                    className="rounded-xl hover:bg-green-600 mr-2"
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
                className={`font-semibold text-lg ${toDo.completed ? "line-through" : ""}`}
            >
                {toDo.title}
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
