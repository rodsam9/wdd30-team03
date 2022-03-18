import ExternalServices from "./externalServices.js";
import "./utils.js"; // To get String.multiReplace()

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
    } else {
      // Get the list of products
      this._list = await new ExternalServices(this.category).getData();
      return this._list;
    }
  }

  /* Pastes a template for the given product index (its position in getList()) */
  async appendProductCard(element, index) {
    const template = document.getElementById("product-card-template");
    let clone = template.content.cloneNode(true);
    let list = await this.getList();
    let product = list[index];

    // Append the element before editing (templates are read-only)
    element.appendChild(clone);
    clone = element.lastElementChild;

    // Replace each template ID with the product's corresponding data
    let discount =
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
      100;
    clone.innerHTML = clone.innerHTML.multiReplace([
      ["$PRODUCT_ID$", product.Id],
      ["$CATEGORY$", this.category],
      ["$IMG_SRC$", product.Images.PrimaryLarge],
      ["$IMG_DESCRIPTION$", product.Name],
      ["$BRAND$", product.Brand.Name],
      ["$NAME$", product.Name],
      ["$LIST_PRICE$", product.ListPrice.toFixed(2)],
      ["$RETAIL_PRICE$", product.SuggestedRetailPrice.toFixed(2)],
      ["$DISCOUNT$", discount.toFixed(0)],
    ]);
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
