const { ConnectDB, getClassFromID } = require("@/database/db-util");

const handler = async (req, res) => {
  let client;
  const classId = req.query.idClass;
  try {
    client = await ConnectDB();
  } catch (e) {
    res.status(500).json({ message: "Cannot connect do database" });
    return;
  }

  if (req.method === "GET") {
    
    try {
      const result = await getClassFromID(client, classId);
      res.status(200).json({ classDetail: result });
    } catch (error) {
      res.status(402).json({ message: "Failed to get data" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const result = await deleteClass(client, classId)
      res.status(201).json({message : result})
    } catch (error) {
      res.status(500).json({message: "Failed to delete class"})
    }
  }
};

export default handler;
