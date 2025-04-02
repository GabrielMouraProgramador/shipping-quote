import Quotation from "../value-objects/Quotation";

export interface ITransportationRepository {
  generateQuote(): Promise<Quotation>;
}
