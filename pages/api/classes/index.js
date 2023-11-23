import { ConnectDB, insertDocument, getDocument } from "@/database/db-util";

const handler = async (req, res) => {
  let client;
  
  try {
    client = await ConnectDB();
  } catch (e) {
    res.status(500).json({ message: "Cannot connect do database" });
    return;
  }

  if (req.method === "POST") {
    const { jadwal, deskripsi, harga, instruktur, kapasitas, tipe, user } =
      req.body;

    const newClass = {
      jadwal: jadwal,
      deskripsi: deskripsi,
      harga: harga,
      instruktur: instruktur,
      kapasitas: kapasitas,
      tipe: tipe,
      user: user,
    };

    let result;

    try {
      result = await insertDocument(client, "Classes", newClass);
    } catch (error) {
      res.status(500).json({ message: "Inserting classfailed!" });
    }

    res.status(201).json({ message: "Class added", class: newClass });
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocument(client, "Classes", { _id: -1 });
      res.status(200).json({ classes: documents });
      
    } catch (error) {
      res.status(500).json({ message: "Failed to get data" });
    }
  }
};

export default handler;
