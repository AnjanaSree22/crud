import pg from 'pg';
const {Pool}=pg;

export const pool = new Pool({
    user: 'postgres',
    password: 'anju@2206',
    host: 'localhost',
    port: 5432,
    database: 'steama_testdb'
});
