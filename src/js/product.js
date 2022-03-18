import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParam, loadHeaderFooter } from "./utils.js";

const category = getParam("category");
const dataSource = new ExternalServices(category);
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

(async function() {
  await product.init();
  document.querySelector("main").innerHTML = product.renderProductDetails();

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", product.addToCart());
})();


// Load the header and footer
loadHeaderFooter();
