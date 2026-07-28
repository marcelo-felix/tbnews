test("Status Code = 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);
  console.log(res.status);
});

test("Retorne um erro = 404", async () => {
  const res = await fetch("http://localhost:3000/api/v1/casa");
  expect(res.status).toBe(404);
  console.log(res.status);
});
