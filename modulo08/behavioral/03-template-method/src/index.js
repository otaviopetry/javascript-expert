import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: 12345,
    amount: 200.000,
    products: [{
        description: 'Ferrari',
    }],
});
const orderBusiness = new OrderBusiness();

console.info('orderCreated', orderBusiness.create(order));