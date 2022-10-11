import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { idText } from "typescript";

export const useUpdateStatus = () => {
    const [status, setStatus] = useState<boolean>();
    const [id, setId] = useState<number>();

    const queryClient = useQueryClient();
    const updateStatus = async () => {
        console.log("updateID:", id);
        console.log("updatestatus:", status)
        const res = await fetch("http://localhost:3000/api/put", {
            mode: "cors",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                is_complete: status
            })
        })
    }

    const updateMutation = useMutation(updateStatus, {
        onSuccess: () => {
            console.log("updates")
            queryClient.invalidateQueries(['getTodos'])
        },
    })

    const handleStatus = async (id: number, is_complete: boolean) => {
        console.log("id:",id);
        console.log("iscomplete:", is_complete)
        await setId(id);
        await setStatus(!is_complete);
        updateMutation.mutate();
    };

    return { handleStatus };
}