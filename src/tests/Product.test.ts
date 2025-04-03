import Product from "../domain/value-objects/Product";

test("Deve testar a cubagem", function () {
  const product = new Product(5, 8, 30, 40, 80);

  expect(product.quantity).toBe(5);
  expect(product.weight).toBe(8);
  expect(product.width).toBe(30);
  expect(product.height).toBe(40);
  expect(product.length).toBe(80);
});
