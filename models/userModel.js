const { db } = require('../config/db')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async (password, email) => {
        const trx = await db.transaction();
        try {
            /** hash the password bcrypt / argon2 */
            const hashPassword = await bcrypt.hash(password + "", 10) // + "" - to make sure its a string

            const [user] = await trx("users").insert({
                email: email.toLowerCase(),
                password: hashPassword
            }, ["email", "id"])

            await trx.commit()
            return user;
        }
        catch(err){
            await trx.rollback();
            console.error(err)
            throw err
        }
    },

    getUserByEmail: async(email) => {
        try {
            const user = await db('users')
            .select('id', 'email', 'password')
            .where({email: email.toLowerCase()})
            .first()
            return user;
        } 
        catch(err){
            throw err
        }
    },

    getUsers: async() => {
        try {
            const users = await db('users')
            .select('id', 'email')
            return users;
        }
        catch(err){
            throw err
        }
    }
}