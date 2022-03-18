var e=(o,t,r)=>new Promise((s,a)=>{var p=d=>{try{i(r.next(d))}catch(c){a(c)}},u=d=>{try{i(r.throw(d))}catch(c){a(c)}},i=d=>d.done?s(d.value):Promise.resolve(d.value).then(p,u);i((r=r.apply(o,t)).next())});import{setLocalStorage as l,getLocalStorage as n}from"./utils.js";export default class h{constructor(t,r){this.productId=t,this.product={},this.dataSource=r}init(){return e(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),this.product.Quantity=1,this.product.SelectedColor=0})}addToCart(){let t=n("so-cart");t==null&&(t=[]);let r=t.find(s=>s.Id==this.product.Id&&s.SelectedColor==this.product.SelectedColor);r!=null?r.Quantity++:t.push(this.product),l("so-cart",t)}renderProductDetails(){var t=(this.product.SuggestedRetailPrice-this.product.FinalPrice)/this.product.SuggestedRetailPrice*100;return`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryExtraLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price"><span class="struck-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span></p><p><span class="discount-price">$${this.product.FinalPrice.toFixed(2)}</span>&ensp;(<span class="price-cut">${t.toFixed(0)}% off!</span>)</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`}}
