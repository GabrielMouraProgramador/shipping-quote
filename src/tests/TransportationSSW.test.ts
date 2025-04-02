import TransportationSSW from "../infrastructure/repositories/TransportationSSW";

test("Deve fazer cotação SSW", async function () {
  const transportedId = "005";
  const transportAuth = {
    cod: "ALC",
    user: "gab33403",
    password: "33403",
    cnpj: 33403625000153,
  };
  const transportData = {
    zipcode: 1153000,
    total: 1000,
    quantity: 4,
    weigth: 8,
    cube: 0.2,
  };

  const transportation = new TransportationSSW(
    transportedId,
    transportAuth,
    transportData,
  );

  const teste = await transportation.generateQuote();
  console.log(teste);
});
