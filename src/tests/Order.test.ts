import Order from "../domain/entities/Order";
import Address from "../domain/value-objects/Address";
import Product from "../domain/value-objects/Product";

test("Deve Criar uma Order", function () {
  const order = new Order(8886565, 1000);
  expect(order.orderId).toBe(8886565);
  expect(order.total).toBe(1000);
});

test("Deve Calcular a Cubagem", function () {
  const product = new Product(5, 8, 50, 50, 80);
  const order = new Order(8886565, 1000);

  order.addProducts([product]);

  expect(order.orderId).toBe(8886565);
  expect(order.total).toBe(1000);
  expect(order.cubage).toBe(0.03);
});
test("Deve add Address ", function () {
  const address = new Address({
    zipCode: 86805300,
    street: "Rua costa rica",
    neighborhood: "Recanto mundo novo",
    city: "Apucarana",
    state: "PR",
  });

  const order = new Order(8886565, 1000);

  order.addAddress(address);

  expect(order.address?.zipCode).toBe(86805300);
  expect(order.address?.street).toBe("Rua costa rica");
  expect(order.address?.neighborhood).toBe("Recanto mundo novo");
  expect(order.address?.city).toBe("Apucarana");
  expect(order.address?.state).toBe("PR");
});
