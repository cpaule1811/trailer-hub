import { getDatabaseConnection } from "../../utils/dbconnect"

export default async function handler(req, res) { 
    const { tags } = req.body 
    const db = getDatabaseConnection()
    try { 
       const tagsInserted = await db('tags').returning('genre_id').insert(tags)
       if (tagsInserted.length) { 
         res.json({success: true})
       }
    }
    catch { 
       res.json({message: "Could not save favourite genres"})
    }
    db.destroy()
}