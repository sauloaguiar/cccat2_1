import DistanceGateway from  '../../domain/gateway/DistanceGateway';
import PlaceOrderOutput from "./PlaceOrderOutput";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderInput from "./PlaceOrderInput";
import OrderService from "../../domain/services/OrderService";

// PlaceOrder funciona como ApplicationService
// segurança, logging, validação/conversão de parametros devem ser realizada nessa camada.
// Lógica de negócio deve ser escrita no DomainService
export default class PlaceOrder {
  distanceGateway: DistanceGateway
  
  repositoryFactory: RepositoryFactory;

  constructor (repositoryFactory: RepositoryFactory, distanceGateway: DistanceGateway) {
    this.repositoryFactory = repositoryFactory;
    this.distanceGateway = distanceGateway
  }

  async execute (input: PlaceOrderInput) : Promise<PlaceOrderOutput> {
    const orderService = new OrderService(this.repositoryFactory, this.distanceGateway);
    const order = await orderService.createOrder(input);
    return new PlaceOrderOutput({
      total: order.getTotal(),
      taxes: order.taxes,
      freight: order.freight,
      orderCode: order.getOrderNumber()
    })
  }
}
