import { useState, useEffect } from "react";
import { ENDPOINTS, STORAGE_KEYS } from "../src/config/constants";

export const useToDos = () => {
    const [toDos, setToDos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    

    useEffect(() => {
        fetchToDos();
    }, [])


    const getToken = ()=>{
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }

    const fetchToDos = async () => {
        setLoading(true);
        try {
            const token = getToken()
            const response = await fetch(ENDPOINTS.GET_TODOS, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" 
                }
            });
            const data = await response.json();
            if (response.ok){
                setToDos(data);
                setError(false);
            }
            else {
                throw Error(response.text)
            }
        } catch (error) {
            console.error("Error cargando tareas:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const addToDo = async (title) => {
        try {
            const token = getToken()
            const response = await fetch(ENDPOINTS.CREATE_TODO, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, completed: false }),
            });
            const newTodo = await response.json();
            setToDos((prev) => [newTodo, ...prev]);
        } catch (error) {
            console.error("Error al crear:", error);
        }
    };


    const deleteToDo = async (todoId) => {
        setToDos(toDos.filter((task) => task.id != todoId));
        const token = getToken()
        const resp = await fetch(ENDPOINTS.DELETE_TODO(todoId),{
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            }
        })
        if (!resp.ok){
            console.error("Error eliminando la tarea: ",resp.text)
        }
    };

    const compleToDo = async (toDo)=>{
        const token = getToken()
        const response = await fetch(ENDPOINTS.COMPLETE_TODO(toDo.id), {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setToDos(toDos.map((td)=>{
                if (td.id == toDo.id){
                    return {
                        ...td, completed: true
                    }
                } else {
                    return td
                }
            }))
            setError(false);
        } else {
            console.log("Error creando tarea");
            setError(true);
        }
    }

    return {toDos, loading, addToDo, error, deleteToDo, compleToDo};
};
