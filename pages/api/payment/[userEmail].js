const { getServerSession } = require("next-auth");
const { authNext } = require("../auth/[...nextauth]");
const { ConnectDB, getLatestPayment } = require("@/database/db-util");

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authNext);

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }

  let client;
  const email = req.query.userEmail;

  try {
    client = await ConnectDB();
  } catch (error) {
    res.status(500).json({ message: "Cannot connect to database!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const result = await getLatestPayment(client,"owengantenk@gmai.com");
      res.status(200).json({payment: result});
    } catch (error) {
      res.status(402).json({message: "Failed to get data"})
    }
  }
};
export default handler;