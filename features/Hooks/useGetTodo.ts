import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Data } from "../../components/types/data.type";

export const useGetTodo = () => {
    const [todos, setTodos] = useState<Data[]>([]);

    const getTodo = async () => {
        const res = await fetch("http://localhost:3000/api/get",{
          mode: "no-cors"
        }).then(
          (response) => {
            return response.json()
          }
          
        );
        setTodos(res.toDo)
    }

    const { isLoading } = useQuery(['getTodos'], () => getTodo(), {
        refetchOnWindowFocus: false,
      }) 
    
    return { todos }
}