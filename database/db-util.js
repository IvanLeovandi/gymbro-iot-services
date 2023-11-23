import { MongoClient, ObjectId } from "mongodb";

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

export async function getUserProfile(client, collection, useremail) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ email: useremail });

  return document;
}

export async function getUsername(client, collection, userUsername) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ username: userUsername });

  return document;
}

export async function updateProfileData(client, userEmail, newData) {
  const db = client.db();
  const result = await db.collection("User").updateOne(
    { email: userEmail },
    {
      $set: {
        nama: newData.nama,
        telepon: newData.telepon,
        email: newData.email,
        alamat: newData.alamat,
      },
    }
  );
  return result;
}

export async function getClassFromID(client, id) {
  const db = client.db();

  const result = await db.collection("Classes").findOne({ _id: new ObjectId(id) });

  return result;
}
