const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const url = "/tarefas";

describe("Teste da rota/tarefas", () => {
  let id;

  test("GET /tarefas deve retornar 200", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
  });

  test("POST /tarefas deve retornar 201", async () => {
    const response = await request.post(url).send({
      nome: "Estudar Node",
      concluida: false,
    });

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
    expect(response.body["id"]).toBeDefined();
    id = response.body["id"];
    expect(response.body["nome"]).toMatch("Estudar Node");
    expect(response.body["concluida"]).toBeFalsy();
  });

  test("GET /id retorna 200", async () => {
    const response = await request.get(`${url}/${id}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["id"]).toBe(id);
    expect(response.body["nome"]).toMatch("Estudar Node");
    expect(response.body["concluida"]).toBeFalsy();
  });

  test("GET /id retornar 404", async () => {
    const response = await request.get(`${url}/1`);

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["msg"]).toBe("Tarefa não encontrada");
  });

  test("PUT /id retorna 200", async () => {
    const response = await request.put(`${url}/${id}`).send({
      nome: "Estudar Node e Express",
      concluida: true,
    });
  });
});
