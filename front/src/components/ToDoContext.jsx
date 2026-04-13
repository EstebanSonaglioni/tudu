import React,{createContext} from "react";
import { useToDos } from "../../hooks/useToDos";

export const ToDoContext = createContext()

export const ToDoContextProvider = ({ children })=>{

    const todosHook = useToDos()

    return <ToDoContext.Provider value={todosHook}>{ children }</ToDoContext.Provider>
}
