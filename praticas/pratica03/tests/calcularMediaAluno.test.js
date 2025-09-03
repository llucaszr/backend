const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test("Calcula a media do aluno.", function(){
    expect(calcularMediaAluno).toBeDefined();
})

test("a1 ou a2 não foram informadas", function(){
    expect(calcularMediaAluno).toBeDefined();
    expect(()=>calcularMediaAluno().toThrow("Nota a1 e a2 não informadas!"));    
    expect(()=>calcularMediaAluno(undefined,2,2).toThrow("Nota a1  não informada!"));    
    expect(()=>calcularMediaAluno(2,undefined,2).toThrow("Nota a2  não informada!"));    
})

test("a1 ou a2 são negativos?", function(){
    expect(()=>calcularMediaAluno(-1,2,0).toThrow("Nota a1 é negativo!"));
    expect(()=>calcularMediaAluno(1,-2,0).toThrow("Nota a2 é negativo!"));
    expect(()=>calcularMediaAluno(-1,-2,0).toThrow("Nota a1 e a2 são negativos!"));
})

test("a3 foi informado?", function(){
  expect(calcularMediaAluno(10,10,undefined)).toBeCloseTo(10)
})

test("a3 é negativo?", function(){
  expect(() => calcularMediaAluno(1, 2, -1).toThrow("Nota a3 é negativo!"))
})

test("Qual a melhor combinação é a1 e a3?", function(){
  expect(calcularMediaAluno(10, 2,10)).toBeCloseTo(10)
  expect(calcularMediaAluno(2,10,10)).toBeCloseTo(10)
})
