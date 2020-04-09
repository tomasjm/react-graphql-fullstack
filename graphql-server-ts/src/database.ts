import { createConnection } from 'typeorm';

export async function connect() {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "biblioteca",
        synchronize: true,
        entities: [
            __dirname + "/entity/*.ts"
        ]
    });
    console.log("connected database");
}