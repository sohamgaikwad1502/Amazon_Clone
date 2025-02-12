import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

import { loadCart } from '../data/cart.js';

Promise.all(
    [
        loadProductsFetch(),

        new Promise((resolve) => {
            loadCart(()=>
            {
                resolve();
            });
        })
            
]).then(()=>
{
    renderOrderSummary();
    renderPaymentSummary();
});






