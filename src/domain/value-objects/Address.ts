export default class Address {
  public number: string = "";
  public complement: string = "";
  public zipCode: number | undefined;
  public street: string | undefined;
  public neighborhood: string | undefined;
  public city: string | undefined;
  public state: string | undefined;

  private static readonly STATES_ALLOWED = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  constructor(data: {
    zipCode: number;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) {
    if (
      typeof data.zipCode !== "number" ||
      isNaN(data.zipCode) ||
      !/^\d{8}$/.test(String(data.zipCode))
    ) {
      throw new Error("Numero do cep invalido.");
    }

    if (!data.street || !data.neighborhood || !data.city || !data.state) {
      throw new Error(
        "Alguns campos do endereço não foram preenchidos corretamente.",
      );
    }
    if (!Address.STATES_ALLOWED.includes(data.state.toUpperCase())) {
      throw new Error("UF do estado invalido.");
    }

    this.zipCode = data.zipCode;
    this.street = data.street;
    this.neighborhood = data.neighborhood;
    this.city = data.city;
    this.state = data.state;
  }
  addNumber(newNumber: string) {
    this.number = newNumber;
  }
  addComplement(newComplement: string) {
    this.complement = newComplement;
  }

  toString(): string {
    return `${this.street}, ${this.city} - ${this.state}, ${this.zipCode}`;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.zipCode === other.zipCode
    );
  }
}
