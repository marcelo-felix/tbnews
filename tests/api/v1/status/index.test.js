test("Versão do postgres:", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const ver = await response.json();
  expect(ver.dependencies.database.version).toEqual(16.0);
});

test("Conexões maximas.", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const ver = await response.json();
  expect(ver.dependencies.database.max_connections).toEqual(100);
  console.log(ver);
});

test("Conexões abertas.", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const ver = await response.json();
  expect(ver.dependencies.database.opened_connections).toBe(1);
});
