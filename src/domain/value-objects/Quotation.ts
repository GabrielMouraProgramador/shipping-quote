export default class Quotation {
  constructor(
    public readonly transportedId: string,
    public readonly id: string,
    public readonly price: number,
    public readonly term: number,
    public readonly isCubage: boolean,
  ) {}
}
