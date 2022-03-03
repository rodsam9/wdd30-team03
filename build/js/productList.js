import ProductData from "./productData.js"

export default class ProductList {
  constructor(category) {
    this.category = category;
	this.path = "json/" + category + ".json";
	this._list = null; // Will be set next time getList() is called
  }
  
  // Returns the list
  async getList() {
	if (this._list != null) {
	  return this._list;
	} else { // Get the list of products
	  this._list = await (new ProductData(this.category)).getData();
	  return this._list;
	}
  }


  /* Pastes a template for the given product index (its position in getList()) */
  async appendProductCard(element, index) {
	const template = document.getElementById('product-card-template');
	let clone = template.content.cloneNode(true);
	let list = await this.getList();
	let product = list[index];
	
	// Append the element before editing (templates are read-only)
	element.appendChild(clone);
	clone = element.lastElementChild;
	
	// Replace each template ID with the product's corresponding data
	let newHTML = clone.innerHTML;
	newHTML = newHTML.replace("$PRODUCT_ID$", product.Id);
	newHTML = newHTML.replace("$IMG_SRC$", product.Image);
	newHTML = newHTML.replace("$IMG_DESCRIPTION$", product.Name);
	newHTML = newHTML.replace("$BRAND$", product.Brand.Name);
	newHTML = newHTML.replace("$NAME$", product.Name);
	newHTML = newHTML.replace("$LIST_PRICE$", product.ListPrice);
	clone.innerHTML = newHTML;
  }
  
  /* Pastes HTML for the entire list. CSS and Javascript *
   * may be necessary to properly display large lists    */
  async appendProductCards(element) {
	let list = await this.getList();
	list.forEach((product, index) => {
	  this.appendProductCard(element, index);
	});
  }
}
