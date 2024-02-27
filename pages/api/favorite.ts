import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismaDB';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req)
      const { movieId } = req.body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      })
      if (!existingMovie) {
        throw new Error("invalid Id");
      }
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ""
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      })
      return res.status(200).json(user)
    }
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req)
      const { movieId } = req.body
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      })
      if (!existingMovie) {
        throw new Error("invalid Id");
      }
      const updatedFavFields = without(currentUser.favoriteIds, movieId)

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ""
        },
        data: {
          favoriteIds: updatedFavFields
        }
      })

      return res.status(200).json(user)
    }

    return res.status(400).end()
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
