import * as soap from "soap";
import { parseStringPromise } from "xml2js";
import Quotation from "../../domain/value-objects/Quotation";
import Order from "../../domain/entities/Order";

export default class TransportationSSW {
  private endPoint = "https://ssw.inf.br/ws/sswCotacaoColeta/index.php?wsdl";
  private zipcode_origin: number = 86804390;

  public codigo_mercadoria: string = "C";
  public tipo_frete: string = "C";

  constructor(
    readonly transportedId: string,
    readonly authTransport: SSWAUTH,
  ) {}

  async generateQuote(data: Order) {
    try {
      // Criar o cliente SOAP de forma assíncrona
      const client = await this.createSoapClient();

      // Montar os parâmetros da requisição SOAP
      const args = {
        cod: this.authTransport.cod,
        user: this.authTransport.user,
        password: this.authTransport.password,
        cnpj: this.authTransport.cnpj,
        cep_origem: this.zipcode_origin,
        cep_destino: data.address?.zipCode,
        valor: data.total,
        quantidade: data.getQuantityTotal(),
        peso: data.getWeightTotal(),
        cubagem: data.getCubage(),
        codigo_mercadoria: this.codigo_mercadoria,
        tipo_frete: this.tipo_frete,
        cod_transportadora: this.authTransport.cod,
      };

      const [result] = await client.cotarAsync(args);
      if (!result?.return?.$value) {
        console.error(result);
        throw new Error("Não foi possivel acessar o SSW");
      }
      const { cotacao } = await this.XMlToJSON(result.return.$value);

      if (
        cotacao?.erro &&
        parseInt(cotacao.erro) !== 0 &&
        parseInt(cotacao.erro) !== 1
      ) {
        console.error(cotacao);
        throw new Error("Cotação processada, porem erro registado");
      }

      if (cotacao?.erro && parseInt(cotacao.erro) === 1) {
        return new Quotation(this.transportedId, "", 0, 0, false, false);
      }

      return new Quotation(
        this.transportedId,
        cotacao.cotacao,
        parseFloat(cotacao.frete.replace(",", ".")),
        parseInt(cotacao.prazo),
        false,
      );
    } catch (error) {
      throw error;
    }
  }

  private async createSoapClient() {
    const client = await soap.createClientAsync(this.endPoint);
    if (!client) {
      throw new Error("Falha ao criar client soap");
    }
    return client;
  }

  async XMlToJSON(xmlData: string) {
    try {
      const jsonData = await parseStringPromise(xmlData, {
        explicitArray: false,
      });
      return jsonData;
    } catch (error) {
      throw new Error("Erro ao converter XML para JSON:");
    }
  }
}

export interface SSWAUTH {
  cod: string | undefined;
  user: string | undefined;
  password: string | undefined;
  cnpj: string | undefined;
}

export interface SSWDATAQUOT {
  zipcode: number;
  total: number;
  quantity: number;
  weigth: number;
  cube: number; // ex: 0.2
}
