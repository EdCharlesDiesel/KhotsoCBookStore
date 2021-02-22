import { ShoppingCart } from '../components/shoppingcart/shoppingcart';

export class Order {
    orderDetails: ShoppingCart[] = [];
    cartTotal: number;
    orderId: string;
    orderDate: Date;
}
