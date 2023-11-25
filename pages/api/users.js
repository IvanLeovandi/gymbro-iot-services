import {
  ConnectDB,
  insertDocument,
  getDocument,
  getUserProfile,
  updateProfileData,
} from "@/database/db-util";
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
    const {
      nama,
      email,
      telepon,
      usia,
      alamat,
      jenisKelamin,
      username,
      password,
      role,
      profileImage,
    } = req.body;

    const newUser = {
      nama: nama,
      email: email,
      telepon: telepon,
      usia: usia,
      alamat: alamat,
      jenisKelamin: jenisKelamin,
      username: username,
      password: password,
      role: role,
      profileImage: profileImage,
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
      const nonMemberResult = documents.filter((user) => {
        return user.role === "NM";
      });
      const memberResult = documents.filter((user) => {
        return user.role === "M";
      });
      const adminResult = documents.filter((user) => {
        return user.role === "admin";
      });

      res.status(200).json({
        nonMember: nonMemberResult,
        member: memberResult,
        admin: adminResult,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get data" });
    }
  }

  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authNext);

    if (!session) {
      res.status(401).json("Not Admin");
      return;
    }

    const { nama, telepon, email, alamat, currentEmail } = req.body;

    const user = await getUserProfile(client, "User", currentEmail);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      client.close();
      return;
    }

    const dataUpdate = {
      nama: nama,
      telepon: telepon,
      email: email,
      alamat: alamat,
    };

    const result = await updateProfileData(client, currentEmail, dataUpdate);

    client.close();
    res.status(200).json({ message: "User updated!" });
  }
};

export default handler;
