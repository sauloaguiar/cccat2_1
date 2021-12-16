import DistanceGatewayAPIMemory from '../../src/infra/gateway/memory/DistanceGatewayAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import PgPromiseDatabase from '../../src/infra/database/PgPromiseDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import MemoryRepositoryFactory from '../../src/infra/factory/MemoryRepositoryFactory';

const distanceGateway = new DistanceGatewayAPIMemory();

describe('PlaceOrder Tests', () => {

    // let database: PgPromiseDatabase;
    // beforeEach(() => {
    //     database = new PgPromiseDatabase();
    // })

  test("Deve fazer um pedido", async function () {
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

    const repositoryFactory = new MemoryRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
  });

  test("Deve fazer um pedido com coupon de desconto expirado", async function () {

    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { id: '1', quantity: 2},
            { id: '2', quantity: 1},
            { id: '3', quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });

    const repositoryFactory = new MemoryRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);
  });

  test("Deve custar R$ 30,00 para enviar guitarra", async () => {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: '11.111-111',
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });
    
    const repositoryFactory = new MemoryRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
  });

  test("Deve fazer um pedido gerando um código", async () => {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: '11.111-111',
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        issueDate: new Date(),
        coupon: "VALE20_EXPIRED"
    });

    const repositoryFactory = new MemoryRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    
    const placeOrder = new PlaceOrder(repositoryFactory, distanceGateway);
    const output = await placeOrder.execute(input);
    expect(output.orderCode).toBe("202100000001")
  })

    // test("Deve gerar informações do pedido", () => {
    //     const cpf = "778.278.412-36"
    //     const zipcode = '11.111-111';
    //     const input = {
    //         cpf,
    //         zipcode,
    //         items: [
    //             { id: "1", quantity: 2},
    //             { id: "2", quantity: 1},
    //             { id: "3", quantity: 3}
    //         ]
    //     };

    //     const placeOrder = new PlaceOrder(distanceGateway);
    //     const output = placeOrder.execute(input);
    //     // check for orderCode, cpf, zipcode, items, price, quantity, discount?, freight, total
    //     expect(output.getOrderInfo()).toBe({
    //         cpf,
    //     });
    // })
})
