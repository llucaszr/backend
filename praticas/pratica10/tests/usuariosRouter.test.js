const app = require("../app");
const supertest = require("supertest");

const request = supertest(app);

const url = "/usuarios";
let id = null;
let token = null;

describe("Teste do recurso /usuarios", () => {
  test("POST /usuarios deve retornar 201", async () => {
    const response = await request.post(`${url}`).send({
      email: "usuario@email.com",
      senha: "abcd1234",
    });
    expect(response.status).toBe(201);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("email", "usuario@email.com");
    id = response.body._id;
  });

  test("POST /usuarios deve retornar 422", async () => {
    const response = await request.post(`${url}`);
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe("E-mail e Senhas são obrigatórios");
  });

  test("POST /usuarios/login deve retornar 200", async () => {
    const response = await request.post(`${url}`).send({
      usuario: "usuario@email.com",
      senha: "abcd1234",
    });
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("POST /usuarios/login deve retornar 401", async () => {
    const response = await request.post(`${url}`);
    expect(response.status).toBe(401);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar deve retornar 200", async () => {
    const response = await request
      .post(`${url}`)
      .set(`authorization, ${token}`);

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar deve retornar 401", async () => {
    const response = await request
      .post(`${url}`)
      .set("authorization", "Bearer 123456789");

    expect(response.status).toBe(401);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/${id} deve retornar 204", async () => {
    const response = await request
      .delete(`${url}/${id}`)
      .set(`authorization ${token}`);

    expect(response.status).toBe(204);
  });
});
