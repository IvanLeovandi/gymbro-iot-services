import { ConnectDB, insertDocument, getDocument } from "database/db-util";

const handler = async (req, res) => {
  let client;

  try {
    client = await ConnectDB();
  } catch (e) {
    res.status(500).json({ message: "Cannot connect do database" });
    return;
  }

  if (req.method === "POST") {
    const { nama, email, telepon, usia, alamat, jenisKelamin, username, password, role } =
      req.body;

    //kalo perlu validasi data disini

    const newUser = {
      nama: nama,
      email: email,
      telepon: telepon,
      usia:usia,
      alamat: alamat,
      jenisKelamin: jenisKelamin,
      username: username,
      password: password,
      role: role,
    };

    let result;

    try {
      result = await insertDocument(client, "User", newUser);
    } catch (error) {
      res.status(500).json({ message: "Inserting user failed!" });
    }

    res.status(201).json({ message: "User added", user: newUser });
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocument(client, "User", { _id: -1 });
      res.status(200).json({ users: documents });
      
    } catch (error) {
      res.status(500).json({ message: "Failed to get data" });
    }
  }
};

export default handler;
