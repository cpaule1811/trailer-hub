import { getDatabaseConnection } from "../../utils/dbconnect";

export default async function handler(req, res) {
  const db = getDatabaseConnection();
  const movie = req.body
  try { 
      const resp = await db("watchlist").insert(movie)
      res.json(resp.rowCount)
  } catch(e) {
      res.json("error")
  }
  db.destroy()
}
