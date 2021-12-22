import GetOrder from "../../application/getOrder/GetOrder";
import PlaceOrder from "../../application/placeOrder/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import DistanceGatewayAPIMemory from "../gateway/memory/DistanceGatewayAPIMemory";
import Http from "./http";


// responsável por configurar rotas
export default class RoutesConfig {
  http: Http;
  repositoryFactory: RepositoryFactory;
  
  // utilizando DIP - a implementação de http é desconhecida - pode ser qualquer framework
  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    this.http = http;
    this.repositoryFactory = repositoryFactory;
  }

  // as rotas da minha aplicação não dependem do framework da minha escolha mas sim da abstração http
  build() {
    this.http.on("post", "/orders", async (params: any, body: any) => {
      try {
        const placeOrder = new PlaceOrder(this.repositoryFactory, new DistanceGatewayAPIMemory());
        const order = await placeOrder.execute(body);
        return order;
      } catch (e) {
        console.log('e', e);
      }
    })

    this.http.on('get', '/orders/${code}', async (params: any, body: any) => {
      try {
        console.log('params code', params);
        const getOrder = new GetOrder(this.repositoryFactory);
        const order = await getOrder.execute(params.code);
        return order;
      } catch (e) {
        console.log('e', e);
      }
    })
  }
}