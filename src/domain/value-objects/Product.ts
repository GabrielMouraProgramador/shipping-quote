export default class Product {
  constructor(
    public readonly quantity: number = 0,
    public readonly weight: number = 0,
    public readonly width: number = 0,
    public readonly height: number = 0,
    public readonly length: number = 0,
    public weightUnitlength: "mm" | "cm" | "m" = "cm",
  ) {}
}
