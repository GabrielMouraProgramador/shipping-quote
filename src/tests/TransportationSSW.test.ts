import { $config } from "../config/config";
import Order from "../domain/entities/Order";
import Product from "../domain/value-objects/Product";
import Quotation from "../domain/value-objects/Quotation";
import TransportationSSW from "../infrastructure/repositories/TransportationSSW";

test("Deve fazer cotação SSW", async function () {
  const transportedId = "005";
  const transportAuth = {
    cod: $config.SSWcod,
    user: $config.SSWuser,
    password: $config.SSWpassword,
    cnpj: $config.SSWcnpj,
  };
  const transportData = {
    zipcode: 1153000,
    total: 1000,
    quantity: 4,
    weigth: 8,
    cube: 0.2,
  };

  const product = new Product(5, 8, 50, 50, 80);
  const order = new Order(8886565, 1000);

  order.addProducts(product);

  const transportation = new TransportationSSW(transportedId, transportAuth);
  const quote = await transportation.generateQuote(order);
  expect(quote).toBeInstanceOf(Quotation);
});
