import PlaceOrder from "./PlaceOrder";

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
    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
});

test("Deve rejeitar um coupon expirado", function() {
    const input = {
        cpf: "778.278.412-36",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2},
            { description: "Amplificador", price: 5000, quantity: 1},
            { description: "Cabo", price: 30, quantity: 3}
        ],
        coupon: "EXPIRADO"
    };
    const placeOrder = new PlaceOrder();
    expect(placeOrder.execute(input)).toThrow(new Error("Cupom expirado!"))
});

