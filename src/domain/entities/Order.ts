import Address from "../value-objects/Address";
import Product from "../value-objects/Product";

export default class Order {
  public cubage: number = 0;
  public totalQuantity: number = 0;
  public totalWeigth: number = 0;
  public total: number = 0;

  public address: Address | undefined;
  private products: Product[] = [];

  constructor(public orderId: number, total: number) {
    if (typeof total !== "number" || isNaN(total) || total <= 0) {
      throw new Error("Total do pedido Invalido.");
    }
    this.total = total;
  }
  public async addProducts(products: Product | Product[]) {
    this.products = Array.isArray(products) ? products : [products];
    await this.calculateCubage();
  }

  public async addAddress(address: Address) {
    this.address = address;
    await this.calculateCubage();
  }
  private calculateCubage() {
    // formula altura * largura * comprimentro / peso | calculo em Metro
    this.cubage = this.products.reduce((totalCubage, product) => {
      if (product.weight <= 0) return totalCubage;

      let productCubage = 0;

      switch (product.weightUnitlength) {
        case "cm": //converte cm para m
          productCubage =
            ((product.height / 100) *
              (product.length / 100) *
              (product.width / 100)) /
            product.weight;
          break;
        case "mm": //converte mm para m
          productCubage =
            ((product.height / 1000) *
              (product.length / 1000) *
              (product.width / 1000)) /
            product.weight;
          break;
        case "m":
          productCubage =
            (product.height * product.length * product.width) / product.weight;
          break;
        default:
          console.warn(`Unidade desconhecida: ${product.weightUnitlength}`);
          return totalCubage; // Ignora unidades inválidas
      }

      return totalCubage + parseFloat(productCubage.toFixed(2));
    }, 0);
  }
}
