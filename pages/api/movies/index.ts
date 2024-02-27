import { NextApiRequest,NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

import prismadb from "@/lib/prismaDB"

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== "GET"){
        res.status(405).end()
    }
    await serverAuth(req)
    try {
        const movies = await prismadb.movie.findMany()
        return res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}