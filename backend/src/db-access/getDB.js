import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.DB_URL;
const client = new MongoClient(url);
let _db;

export async function getDB() {
    if (_db) {
        return _db
    }

    const connectedClient = await client.connect()
    const db = connectedClient.db(process.env.DB_NAME || "Tweetie")
    _db = db; // DATENBANK-REFERENZ ZWISCHENSPEICHERN !!!
    return _db
}