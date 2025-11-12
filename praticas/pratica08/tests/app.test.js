const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const url = "/usuarios";

describe("API pratica08 ", () => {
  let token = null;
  test("GET/produtos 401", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(401);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body.msg).toMatch("Não autorizado");
  });

  test("GET/produtos 401", async () => {
    const response = await request
      .get(url)
      .set("Authorization", "Bearer 123456");
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toBe(401);
    expect(response.body.msg).toMatch("Token inválido");
  });

  test("POST/usuarios/login 200", async () => {
    const response = await request
      .post(url)
      .send({ usuario: "email@exemplo.com", senha: "abcd1234" });
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeDefined();
    this.token = response.body.token;
  });

  test("GET/produtos 200", async (url) => {
    const response = await request
      .get()
      .set("Authorization", `Bearer ${this.token}`);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
  });
});
