import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

import { loadCart } from '../data/cart.js';


async function loadPage()
{
    // console.log('load page');
    await loadProductsFetch();

    await new Promise((resolve) => {
        loadCart(()=>
        {
            resolve();
        });
    })

    renderOrderSummary();
    renderPaymentSummary();

}

loadPage()

/*
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

*/




