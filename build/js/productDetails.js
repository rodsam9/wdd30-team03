var a=(c,r,d)=>new Promise((e,s)=>{var u=t=>{try{i(d.next(t))}catch(o){s(o)}},p=t=>{try{i(d.throw(t))}catch(o){s(o)}},i=t=>t.done?e(t.value):Promise.resolve(t.value).then(u,p);i((d=d.apply(c,r)).next())});import{setLocalStorage as l}from"./utils.js";export default class n{constructor(r,d){this.productId=r,this.product={},this.dataSource=d}init(){return a(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){l("so-cart",this.product)}renderProductDetails(){return`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Image}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`}}
