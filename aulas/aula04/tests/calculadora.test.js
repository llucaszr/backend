const { soma, multiplicacao, divisao } = require("../src/calculadora.js");

describe("Testa as funções da calculadora.js", function () {
  test("soma", function () {
    expect(soma).toBeDefined();
    expect(soma(2, 2)).toBe(4);
    expect(soma(2, 0)).toBe(2);
    expect(soma(-2, 4)).toBe(2);
    expect(soma(-2, -1)).toBe(-3);
  });

  test("multiplicação", function () {
    expect(multiplicacao).toBeDefined();
    expect(multiplicacao(2, 2)).toBe(4);
    expect(multiplicacao(2, 0)).toBe(0);
    expect(multiplicacao(-2, -1)).toBe(2);
    expect(multiplicacao(-2, 1)).toBe(-2);
  });

  test("Ñão pode dividir por zero", function () {
    expect(() => divisao(2, 0)).toThrow("Divisão por zero!");
    expect(divisao(2, 2)).toBe(1);
  });
});
