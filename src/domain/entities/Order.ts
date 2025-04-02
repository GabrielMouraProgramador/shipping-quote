import Address from "../value-objects/Address";

export default class Order {
  public cube: number = 0;
  public totalQuantity: number = 0;
  public totalWeigth: number = 0;
  public total: number = 0;

  private address: Address | undefined;

  constructor(
    public orderId: number,
    total: number,
    address: Address,
  ) {
    if (typeof total !== "number" || isNaN(total) || total <= 0) {
      throw new Error("Total do pedido Invalido.");
    }
    this.total = total;
    this.address = address;
  }
}
