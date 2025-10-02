const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const url = "/tarefas";

describe("Teste de rotas", () => {
  let id = "1a2b";
  test("GET/ 200", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
  });
  test("POST/ 201", async () => {
    const response = await request.post(url).send({
      id: id,
      nome: "Estudar Node",
      concluida: false,
    });
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
  test("GET/:id 200", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
  test("GET/1 404", async () => {
    const response = await request.get(`${url}/1`);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
  test("PUT/:id 200", async () => {
    const response = await request.put(`${url}/${id}`).send({
      nome: "Estudar Node e Express",
      concluida: true,
    });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
  test("PUT/1 404", async () => {
    const response = await request.put(`${url}/1`);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("DELETE/:id 204", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
  });
  test("DELETE/1 404", async () => {
    const response = await request.delete(`${url}/1`);
    expect(response.status).toBe(404);
  });
});
