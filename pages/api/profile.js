import {
  ConnectDB,
  getUserProfile,
  updateProfileRole,
} from "@/database/db-util";
import { getServerSession } from "next-auth";
import { authNext } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authNext);

  if (!session) {
    return;
  }

  const userEmail = session.user.email;
  let client;

  try {
    client = await ConnectDB();
  } catch (e) {
    res.status(500).json({ message: "Cannot connect do database" });
    return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getUserProfile(client, "User", userEmail);
      res.status(200).json({ user: documents });
    } catch (error) {
      res.status(500).json({ message: "Failed to get data" });
    }
  }

  if (req.method === "PATCH") {
    const { role, expiredDate } = req.body;

    const user = await getUserProfile(client, "User", userEmail);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      client.close();
      return;
    }

    const updateProfile = {
      role: role,
      expiredDate: expiredDate,
    };

    const result = await updateProfileRole(client, userEmail, updateProfile);

    client.close();
    res.status(200).json({ message: "Role updated" });
  }
};

export default handler;
