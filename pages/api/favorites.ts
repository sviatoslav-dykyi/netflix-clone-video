import { NextApiRequest, NextApiResponse } from "next";

import { without } from "lodash";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return res.status(200).json(favoriteMovies);
  } catch (e) {
    console.log("e", e);
    return res.status(500).end();
  }
}
