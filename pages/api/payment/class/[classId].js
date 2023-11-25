const { getServerSession } = require("next-auth");
const { authNext } = require("../../auth/[...nextauth]");
const { ConnectDB, getLatestClassPayment, insertDocument } = require("@/database/db-util");

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authNext);

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }

  let client;
  const classId = req.query.classId;

  try {
    client = await ConnectDB();
  } catch (error) {
    res.status(500).json({ message: "Cannot connect to database!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const result = await getLatestClassPayment(client, classId);
      res.status(200).json({ payment: result });
    } catch (error) {
      res.status(402).json({ message: "Failed to get data" });
    }
  }

  if (req.method === "POST") {
    const data = req.body;
    const { harga, metode, judul, email } = data;
    const newPayment = {
      harga: harga,
      item: judul,
      metode: metode,
      tanggal: new Date(Date.now()),
      email: email,
    };

    const result = await insertDocument(
      client,
      "Payments",
      newPayment,
    );
    client.close();
    res.status(201).json({ message: "Payment Sent" });
  }
};
export default handler;
