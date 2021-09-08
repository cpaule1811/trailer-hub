import bcrypt from 'bcrypt'
import { getDatabaseConnection } from "../../utils/dbconnect"

export default async function handler (req, res) {
    const db = getDatabaseConnection()
    const { email, password } = req.body
    if (!email || !password){ 
        return res.json({message: 'Please fill out all fields'})
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)
    try { 
        await db.transaction(async trx => {
                const newEmail = await trx('login')
                .returning('email')
                .insert({
                    hash: hash,
                    email: email
                })
                const newUser = await trx('users')
                .returning('user_id')
                .insert({ 
                    email: newEmail[0],
                    created: new Date() 
                })
                await trx.commit() 
                res.json({ user_id: newUser[0] })
        })
    } 
    catch(err) { 
        await trx.rollback()
        res.json({message: "could not register user"})
    }
    db.destroy()
}
