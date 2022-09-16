import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default async (req: NextApiRequest,res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const toDo = await prisma.toDo.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ]
    });
    res.status(200).json({toDo : toDo})
}