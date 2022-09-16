import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useAddTodo = () => { 
    const [title, setTitle] = useState('');
    const queryClient = useQueryClient();
    const addTodo = async () => {
        const res = await fetch("http://localhost:3000/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                is_complete: false,
                created_at: new Date(),
            })
        })
    }

    const addMutation = useMutation(addTodo, {
        onSuccess: () => {
            console.log("useMutation")
            queryClient.invalidateQueries(['getTodos'])
        },
    })
    
    const handleSubmit = (e:any) => {
    e.preventDefault();
    addMutation.mutate();
    setTitle('');
    }

    return { title, setTitle, handleSubmit};

}




