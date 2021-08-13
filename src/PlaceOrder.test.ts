import DistanceGateway from './DistanceGateway';
import PlaceOrder from "./PlaceOrder";

const distanceGateway = new DistanceGateway();

test("Deve fazer um pedido", function () {
    const input = {
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2},
            { description: "Amplificador", price: 5000, quantity: 1},
            { description: "Cabo", price: 30, quantity: 3}
        ],
        coupon: "VALE20"
    };
    const placeOrder = new PlaceOrder(distanceGateway);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
});

test("Deve fazer um pedido com coupon de desconto expirado", function () {
    const input = {
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2},
            { description: "Amplificador", price: 5000, quantity: 1},
            { description: "Cabo", price: 30, quantity: 3}
        ],
        coupon: "EXPIRED"
    };
    const distanceGateway = new DistanceGateway();
    const placeOrder = new PlaceOrder(distanceGateway);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
});

test("Deve custar R$ 30,00 para enviar guitarra", () => {
    const input = {
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2},
        ]
    };

    // eu deveria adicionar a logica de custo de frete ao caso de uso PlaceOrder?
    // ou eu deveria ter um caso de uso específico para calcular esse custo e os casos de uso se comunicariam?
    const placeOrder = new PlaceOrder(distanceGateway);

    // sendo no mesmo caso de uso - eu adicionaria um novo metodo? estimateDeliveryCost?
    // quem seria a entidade que teria o cep de origem e destino armazenado?
    
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
})

