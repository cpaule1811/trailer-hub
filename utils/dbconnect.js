const knex = require("knex")

export const getDatabaseConnection = () => {
    const connection = knex({
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING
    })
    return connection
}