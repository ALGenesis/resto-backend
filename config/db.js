import {Pool} from 'pg'

const password = process.env.DB_PASSWORD || 'postgres';
const user = process.env.DB_USER || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;
const database = process.env.DB_NAME || 'postgres';

const pool = new Pool({
    host: host,
    port: port,
    database: database,
    user: user,
    password: password
});

pool.on('error', (err) => {
    console.error('Une erreur s\'est produite au niveau du client de  base de données', err);
    process.exit(-1);
})

export function connectToDatabase() {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Erreur de connexion à la base de données', err.stack);
        } else {
            console.log('Connexion à la base de données réussie');
            release();
        }
    });

}

export default pool;