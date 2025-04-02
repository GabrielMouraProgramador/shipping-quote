import Order from "../domain/entities/Order";
import Address from "../domain/value-objects/Address";

test("Deve Criar uma Order", function () {
  const address = new Address({
    zipCode: 86805300,
    street: "Rua costa rica",
    neighborhood: "Recanto mundo novo",
    city: "Apucarana",
    state: "PR",
  });

  const order = new Order(8886565, 1000, address);
  expect(order.orderId).toBe(8886565);
  expect(order.total).toBe(1000);
});
