import { ConnectDB, editPaymentEmail, getUserProfile } from "@/database/db-util";
import { getServerSession } from "next-auth";
import { authNext } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  let client;
  try {
    client = await ConnectDB();
  } catch (error) {
    res.status(500).json({ message: "Cannot connect to database!" });
    return;
  }

  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authNext);

    if (!session) {
      console.log("Session error")
      return;
    }

    const {  email, currentEmail } = req.body;

    const user = await getUserProfile(client, "User", currentEmail);

    if (!user) {
      console.log("User not found")
      client.close();
      return;
    }

    const dataUpdate = {
      email: email,
    };

    const result = await editPaymentEmail(client, currentEmail, dataUpdate);

    client.close();
    res.status(200).json({ message: "User updated!" });
  }
};

export default handler;
