import { getDatabaseConnection } from "../../utils/dbconnect"

export default async function handler(req, res) { 
    const { user_id } = req.query
    const db = getDatabaseConnection()
    try { 
       const genreIds = await db('tags').select('genre_id').where('user_id', user_id)
       const genreString = genreIds.map(genre => {
          return genre.genre_id
       }).join('|')
       res.json({genreString: genreString})
    }
    catch { 
       res.status(400).json()
    }
    db.destroy()
}