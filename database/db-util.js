import { MongoClient } from "mongodb";

export async function ConnectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://tubesrpl:tubesrpl@cluster0.9yvxluf.mongodb.net/GBMS?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getDocument(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
