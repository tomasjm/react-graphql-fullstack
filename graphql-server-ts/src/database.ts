import { createConnection } from 'typeorm';

export async function connect() {
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL || 'postgressql://postgres:1234@localhost:5432/biblioteca',
        synchronize: true,
        entities: [
            __dirname + "/entity/*.ts",
            __dirname + "/entity/*.js"
        ]
    });
    console.log("connected database");
}