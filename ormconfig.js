/* eslint-disable prettier/prettier */
module.exports = {
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'goddy',
    password: '12345',
    database: 'djangonautic-db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationDir: 'src/migrations'
    }
}