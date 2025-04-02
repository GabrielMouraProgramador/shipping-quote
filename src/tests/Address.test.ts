import Address from "../domain/value-objects/Address";

test("Deve criar Address", function () {
  const address = new Address({
    zipCode: 86805300,
    street: "Rua costa rica",
    neighborhood: "Recanto mundo novo",
    city: "Apucarana",
    state: "PR",
  });
  address.addNumber("6460");
  address.addComplement("Casa verde");
  expect(address.zipCode).toBe(86805300);
  expect(address.street).toBe("Rua costa rica");
  expect(address.neighborhood).toBe("Recanto mundo novo");
  expect(address.city).toBe("Apucarana");
  expect(address.state).toBe("PR");
  expect(address.number).toBe("6460");
  expect(address.complement).toBe("Casa verde");
});
test("Deve lançar uma exceção para um CEP inválido", function () {
  expect(() => {
    new Address({
      zipCode: 86805,
      street: "Rua costa rica",
      neighborhood: "Recanto mundo novo",
      city: "Apucarana",
      state: "PR",
    });
  }).toThrow("Numero do cep invalido."); // Mensagem deve ser exatamente a lançada na classe
});

test("Deve lançar uma exceção para de campos invalidos", function () {
  expect(() => {
    new Address({
      zipCode: 86805300,
      street: "Rua costa rica",
      neighborhood: "Recanto mundo novo",
      city: "",
      state: "PR",
    });
  }).toThrow("Alguns campos do endereço não foram preenchidos corretamente");

  expect(() => {
    new Address({
      zipCode: 86805300,
      street: "Rua costa rica",
      neighborhood: "Recanto mundo novo",
      city: "",
      state: "PR",
    });
  }).toThrow("Alguns campos do endereço não foram preenchidos corretamente");
});

test("Deve um erro de Estado invalido", function () {
  expect(() => {
    new Address({
      zipCode: 86805300,
      street: "Rua costa rica",
      neighborhood: "Recanto mundo novo",
      city: "Apucarana",
      state: "Parana", // certo PR
    });
  }).toThrow("UF do estado invalido.");
});
