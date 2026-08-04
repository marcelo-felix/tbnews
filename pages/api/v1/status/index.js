import database from "infra/database.js";

async function status(request, response) {
  //Retorna a versão do postgres
  const versiondb = await database.query("SHOW server_version;");
  const respVersion = versiondb.rows[0].server_version;

  //Busca no postgres o numero maximo de conexões
  const maxConnectionsdb = await database.query("SHOW max_connections;");

  const respMaxConnections = maxConnectionsdb.rows[0].max_connections;
  const namedb = process.env.POSTGRES_DB;

  //tratando a query como object para efitar sql injection
  const openedConnectionsdb = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [namedb],
  });
  const respOpenedConnections = openedConnectionsdb.rows[0].count;

  //Retorna um json em "http://localhost:3000/api/v1/status" se o status for 200
  response.status(200).json({
    dependencies: {
      database: {
        version: parseInt(respVersion),
        max_connections: parseInt(respMaxConnections),
        opened_connections: respOpenedConnections,
      },
    },
  });
}

export default status;
