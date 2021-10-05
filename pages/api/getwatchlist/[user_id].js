import { getDatabaseConnection } from "../../../utils/dbconnect";

export default async function handler(req, res) {
  const db = getDatabaseConnection();
  const { user_id } = req.query;
  try {
    const resp = await db("watchlist").select("*").where('user_id', user_id);
    res.json(resp);
  } catch (e) {
      console.log(e)
    res.json("error");
  }
  db.destroy();
}
