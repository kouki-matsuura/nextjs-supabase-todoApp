// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const result =await  prisma.toDo.create({
    data: {
        title: req.body.title,
        is_complete: req.body.is_complete,
        created_at: req.body.created_at,
    },
  })
  console.log("result:",result)
  res.status(200).json(
   result
  )
}




