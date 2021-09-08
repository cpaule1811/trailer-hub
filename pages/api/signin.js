import bcrypt from 'bcrypt'
import { getDatabaseConnection } from "../../utils/dbconnect"

export default async function handler (req, res) { 
    const db = getDatabaseConnection();
    const { email, password } = req.body
    if (!email || !password) { 
        return res.json({ message: "Please enter valid credentials" })
    }
    try {
        const credentials = await db('login').select("hash").where('email', email) 
        const isValid = await bcrypt.compare(password, credentials[0].hash)
        if (isValid){
            const user = await db('users').select('user_id').where('email', email)
            res.json(user[0])
        }
    }
    catch (e) { 
        res.json({ message: "wrong credentials" })
    } 

    db.destroy()
}