import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import DistanceGatewayAPIMemory from '../../src/infra/gateway/memory/DistanceGatewayAPIMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import GetOrder from '../../src/application/GetOrder';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

const distanceGateway = new DistanceGatewayAPIMemory();

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

    const repositoryFactory = new DatabaseRepositoryFactory();

    const orderRepository = OrderRepositoryMemory.getInstance();
    await orderRepository.clean();
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOutput = await getOrder.execute(output.orderCode)
    expect(getOrderOutput.total).toBe(5982);
  });
})