import { setLocalStorage, getLocalStorage } from "./utils.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
	this.product.Quantity = 1;
	this.product.SelectedColor = 0;
  }
  addToCart() {
	let cart = getLocalStorage("so-cart");
	if (cart == null) cart = [];
	
	// Add the item
	let cartItem = cart.find(item => item.Id == this.product.Id && item.SelectedColor == this.product.SelectedColor);
	if (cartItem != null)
	  cartItem.Quantity++;
    else
	  cart.push(this.product);

    setLocalStorage("so-cart", cart);
  }
  renderProductDetails() {
	var discount = (this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice * 100;
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryExtraLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price"><span class="struck-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span></p><p><span class="discount-price">$${this.product.FinalPrice.toFixed(2)}</span>&ensp;(<span class="price-cut">${discount.toFixed(0)}% off!</span>)</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}
