const Pool = require('pg').Pool
require('dotenv').config()
console.log(process.env)

const pool=new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// hardcoded form of heroku credientials
/* 
const pool=new Pool({
    user:'grzdwwakbjnbpw',
    host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
    database: 'db9hteadmsi37c',
    password:'2048b25078b55b6fff42a000649fdda9b96234ea6396675171a67ab29e621ce1',
    port:5432,
    ssl: {
        rejectUnauthorized: false
    }
}); */

module.exports =pool;