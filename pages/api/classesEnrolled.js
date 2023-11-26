import { ConnectDB, insertDocument, getDocument, editClassEnolledEmail, getUserProfile } from "@/database/db-util";
import { getServerSession } from "next-auth";
import { authNext } from "./auth/[...nextauth]";
const handler = async (req, res) => {
  let client;

  try {
    client = await ConnectDB();
  } catch (e) {
    res.status(500).json({ message: "Cannot connect do database" });
    return;
  }

  if (req.method === "POST") {
    const { email, classId } = req.body;

    const newClassEnroll = {
      email: email,
      classId: classId,
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

  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authNext);

    if (!session) {
      console.log("session error")
      return;
    }

    const {  email, currentEmail } = req.body;

    const user = await getUserProfile(client, "User", currentEmail);

    if (!user) {
      client.close();
      console.log("User not found")
      return;
    }

    const dataUpdate = {
      email: email,
    };

    const result = await editClassEnolledEmail(client, currentEmail, dataUpdate);

    client.close();
    res.status(200).json({ message: "User updated!" });
  } 
};

export default handler;
