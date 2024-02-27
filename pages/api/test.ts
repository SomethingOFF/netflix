import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "@/lib/prismaDB"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    try {
        const users = await prismadb.user.findMany()
        return res.status(200).send(users) 
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}