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
    const { username,instruktur,jadwal } =
      req.body;

    const newClassEnroll = {
      username:username,
      instruktur:instruktur,
      jadwal:jadwal,
    };

    let result;

    try {
      result = await insertDocument(client, "ClassEnrolled", newClassEnroll);
    } catch (error) {
      res.status(500).json({ message: "Inserting classfailed!" });
    }

    res.status(201).json({ message: "Class added", class: newClassEnroll });
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocument(client, "ClassEnrolled", { _id: -1 });
      res.status(200).json({ classesEnrolled: documents });
      
    } catch (error) {
      res.status(500).json({ message: "Failed to get data" });
    }
  }
};

export default handler;
