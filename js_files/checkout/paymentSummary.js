import { cart } from "../../data/cart.js";
import { getDeliveryOption} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { moneyConvert } from "../utils/money.js"
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary()
{
    let productPriceCents = 0 ;
    let shippingPriceCents = 0 ;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents  += product.priceCents * cartItem.quantity;

        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        shippingPriceCents += deliveryOption.priceCents;
    });

    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

    const taxCents = totalBeforeTaxCents * 0.1;

    const TotalCents = totalBeforeTaxCents + taxCents;

    
    const paymentSummaryHTML = `
        
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${moneyConvert(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${moneyConvert(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${moneyConvert(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${moneyConvert(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${moneyConvert(TotalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
                 
    ` ;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML ;
    
    document.querySelector('.js-place-order').addEventListener('click',async()=>
    {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    cart:cart
                })
            })

            const order = await response.json();
            console.log(order);
            addOrder(order);
            
        }
        

        catch(error) 
        {
            console.log("Unexpected error try again later") ;
        }
        
        window.location.href = 'orders.html'
    })
}

