const {
  ConnectDB,
  getUserProfile,
  insertDocument,
  getUsername,
} = require("@/database/db-util");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const {
      nama,
      telepon,
      email,
      alamat,
      usia,
      jenisKelamin,
      username,
      password,
      confirmPassword,
      profileImage
    } = data;

    if (usia < 15) {
      res.status(500).json({ message: "Usia harus diatas 15 tahun" });
      return;
    }
    if (jenisKelamin !== "Laki-laki" && jenisKelamin !== "Perempuan") {
      res
        .status(500)
        .json({ message: "Tolong masukkan jenis kelamin dengan benar" });
      return;
    }
    if (password !== confirmPassword) {
      res
        .status(500)
        .json({ message: "Password dan Confirm Password wajib sama" });
    }

    let client;
    try {
      client = await ConnectDB();
    } catch (error) {
      res.status(500).json({ message: "Cannot connect do database" });
      return;
    }

    const existingUser = await getUserProfile(client, "User", email);
    const existingUsername = await getUsername(client, "User", username);

    if (existingUser) {
      res.status(500).json({ message: "Email already existed" });
      client.close();
      return;
    }

    if (existingUsername) {
      res.status(500).json({ message: "Username already existed" });
      client.close();
      return;
    }
    const newUser = {
      password: password,
      alamat: alamat,
      email: email,
      jenisKelamin: jenisKelamin,
      nama: nama,
      role: "NM",
      telepon: telepon,
      username: username,
      usia: usia,
      profileImage: profileImage,
      expiredDate: null,
    };
    const result = await insertDocument(client, "User", newUser);

    client.close();
    res.status(201).json({ message: "User Registered" });
  }
};

export default handler;
