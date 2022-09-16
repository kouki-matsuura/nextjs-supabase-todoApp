import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("put")
    const prisma = new PrismaClient();
    const result = await prisma.toDo.update({
        where: {
            id: req.body.id
        },
        data: {
            is_complete: req.body.is_complete
        },
    })
    res.status(200).json(
        result
    )
}