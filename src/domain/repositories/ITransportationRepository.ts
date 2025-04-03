import Order from "../entities/Order";
import Quotation from "../value-objects/Quotation";

export interface ITransportationRepository {
  generateQuote(order: Order): Promise<Quotation>;
}
