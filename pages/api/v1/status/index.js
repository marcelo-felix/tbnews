import database from "infra/database.js";

async function status(request, response) {
  const resq = await database.query("SELECT 1 + 1 as sum;");
  console.log(resq.rows);
  response.status(200).json({ Status: "Ok." });
}

export default status;
