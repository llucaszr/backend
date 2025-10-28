const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

const url = "/produtos";

let id = null;

describe("Testes da API /produtos", () => {
  test("POST /produtos 201", async () => {
    const response = await request.post(url).send({
      nome: "laranja",
      preco: "10.0",
    });
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("laranja");
    expect(response.body.preco).toBe(10);
    id = response.body._id;
  });

  test("POST /produtos 422", async () => {
    const response = await request.post(url).send({ nome: "" });
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });

  test("GET /produtos 200", async () => {
    const response = await request.get(`${url}`);
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /produtos/${id} 200", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBeDefined();
    expect(response.body.preco).toBeDefined();
  });

  test("GET /produtos/0 400", async () => {
    const response = await request.get(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  test("GET /produtos/00000000000000000000000 404", async () => {
    const response = await request.get(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  test("PUT /produtos/${id} 200", async () => {
    const response = await request
      .put(`${url}/${id}`)
      .send({ nome: "Laranja Pera", preco: "18.00" });
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("Laranja Pera");
    expect(response.body.preco).toBe(18);
  });

  test("PUT /produtos/${id} 422", async () => {
    const response = await request.put(`${url}/${id}`).send({ nome: "" });
    expect(response.status).toBe(422);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });

  test("PUT /produtos/0 400", async () => {
    const response = await request.put(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  test("PUT /produtos/000000000000000000000000 404", async () => {
    const response = await request.put(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  test("DELETE /produtos/${id} 204", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /produtos/0 400", async () => {
    const response = await request.delete(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  test("DELETE /produtos/000000000000000000000000 404", async () => {
    const response = await request.delete(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });
});
