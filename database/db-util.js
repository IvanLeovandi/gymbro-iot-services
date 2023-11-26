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

  const result = await db
    .collection("Classes")
    .findOne({ _id: new ObjectId(id) });

  return result;
}

export async function getNotificationFromEmail(client, userEmail) {
  const db = client.db();

  const result = await db
    .collection("Notification")
    .find({ email: userEmail })
    .sort({ _id: -1 })
    .toArray();

  return result;
}

export async function deleteAllNotification(client, userEmail) {
  const db = client.db();

  const result = await db
    .collection("Notification")
    .deleteMany({ email: userEmail });

  return result;
}

export async function incrementClass(client, id, newData) {
  const db = client.db();

  const result = await db.collection("Classes").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        user: newData.user,
      },
    }
  );

  return result;
}

export async function getLatestPayment(client, userEmail) {
  const db = client.db();

  const result = await db
    .collection("Payments")
    .findOne({ email: userEmail }, {}, { sort: { _id: -1 } });

  return result;
}
export async function getLatestClassPayment(client, classId) {
  const db = client.db();

  const result = await db
    .collection("Payments")
    .findOne({ _id: new ObjectId(classId) }, {}, { sort: { _id: -1 } });

  return result;
}

export async function deleteClass(client, id) {
  const db = client.db();

  const result = await db
    .collection("Classes")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function updateProfileRole(client, userEmail, newData) {
  const db = client.db();
  const result = await db.collection("User").updateOne(
    { email: userEmail },
    {
      $set: {
        role: newData.role,
        expiredDate: newData.expiredDate,
      },
    }
  );
  return result;
}

export async function editPaymentEmail(client, userEmail, newData) {
  const db = client.db();
  const result = await db.collection("Payments").updateMany(
    { email: userEmail },
    {
      $set: {
        email: newData.email,
      }
    }
  )

  return result
}

export async function editClassEnolledEmail(client, userEmail, newData) {
  const db = client.db();
  const result = await db.collection("ClassEnrolled").updateMany(
    { email: userEmail },
    {
      $set: {
        email: newData.email,
      }
    }
  )

  return result
}

export async function editNotificationEmail(client, userEmail, newData) {
  const db = client.db();
  const result = await db.collection("Notification").updateMany(
    { email: userEmail },
    {
      $set: {
        email: newData.email,
      }
    }
  )

  return result
}

export async function deleteClassEnrolledClass(client, id) {
  const db = client.db();

  const result = await db
    .collection("ClassEnrolled")
    .deleteMany({ classId: id });
  return result;
}