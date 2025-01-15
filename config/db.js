const knex = require('knex')
require('dotenv').config();

const {PGUSER, PGDATABASE, PGPORT, PGPASSWORD, PGURL} = process.env

module.exports = {
    db: knex({
        client: 'pg',
        connection: {
            // port: PGPORT,
            // user: PGUSER,
            // database: PGDATABASE,
            // password: PGPASSWORD
            connectionString: PGURL
        }
    })
}
