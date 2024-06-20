import {moneyConvert} from '../js_files/utils/money.js';

class Product 
{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails)
  {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents =productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStartUrl()
  {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice()
  {
    return `$${moneyConvert(this.priceCents)}`;

  }
  extraInfoHtml()
  {
    return '';
    
  }
}

export function getProduct(productId)
{
  let matchingProduct;

  products.forEach((product) => {
      if (product.id === productId) {
          matchingProduct = product;
      }
  });

  return matchingProduct;

}
class Clothing extends Product
{
  sizeChartLink ;

  constructor(productDetails) 
  {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml()
  {
    return `
    <a href='${this.sizeChartLink}' target="_blank">Size chart</a>
    `
  }
}
 
// const date = new Date() ;
// console.log(date) ;

/*
const object2 = {
  a : 4 ,
  b : this.a
}
*/

export let products = [];

export function loadProductsFetch()
{
  const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
    
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) =>
      {
        if (productDetails.type === 'clothing'){
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      console.log('load Products');
  });
  return promise;
}

// loadProductsFetch().then(()=>{
//   console.log('next step');
// });


export function loadProducts(fun)
{
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load' , () => 
  {
    products = JSON.parse(xhr.response).map((productDetails) =>
      {
        if (productDetails.type === 'clothing'){
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      fun();
    
  })
  
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send(); 
}
 