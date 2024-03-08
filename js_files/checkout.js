import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyConvert } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';



const TodaysDate = dayjs();
const deliveryDate = TodaysDate.add(7, 'days');

deliveryDate.format('dddd, MMMM D');

function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        })

        const deliveryOptionsId = cartItem.deliveryOptionsId;

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionsId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        cartSummaryHTML +=
            `<div class="cart-item-container 
            js-product-id-${cartItem.productId}">
            <div class="delivery-date">
            Delivery Date : ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src= ${matchingProduct.image}>

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${moneyConvert(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id ="${cartItem.productId}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem.productId, cartItem)}
            </div>
        </div>
    </div>
    `;
    })

    document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener('click', () => {
            console.log("Deleted");
            const productId = link.dataset.productId;
    
            removeFromCart(productId);
            console.log(productId);
    
            const container = document.querySelector(`.js-product-id-${productId}`);
            container.remove();
    
        })
    });
    
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            })
        })
}


function deliveryOptionsHTML(productId, cartItem) {
    let deliveryHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        const priceString = deliveryOption.priceCents
            === 0 ? 'FREE' : `$${moneyConvert(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id ===
            cartItem.deliveryOptionsId;
        deliveryHTML += `
        <div class="delivery-option js-delivery-option"
        data-product-id = "${productId}"
        data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name=${productId}>
            <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
            </div>
        </div>
        
        `

    });
    return deliveryHTML;
}


renderOrderSummary();