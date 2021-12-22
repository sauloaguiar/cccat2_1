import DistanceGatewayAPIMemory from '../../src/infra/gateway/memory/DistanceGatewayAPIMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/placeOrder/PlaceOrder';
import PlaceOrderInput from '../../src/application/placeOrder/PlaceOrderInput';
import GetOrder from '../../src/application/getOrder/GetOrder';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory';

let distanceGateway: DistanceGatewayAPIMemory
let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
  distanceGateway = new DistanceGatewayAPIMemory();
  
  repositoryFactory = new DatabaseRepositoryFactory();
  const orderRepository = repositoryFactory.createOrderRepository();
  await orderRepository.clean();
})

describe('GetOrder Tests', () => {

  test("Deve consultar um pedido", async function () {
    // crio um pedido para poder consulta-lo
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { id: '1', quantity: 2},
            { id: '2', quantity: 1},
            { id: '3', quantity: 3}
        ],
        coupon: "VALE20"
    });
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOutput = await getOrder.execute(output.orderCode)
    expect(getOrderOutput.total).toBe(5982);
  });
})