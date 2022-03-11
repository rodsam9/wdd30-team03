import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam, loadHeaderFooter } from "./utils.js";

const category = getParam("category");
const dataSource = new ProductData(category);
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

// Load the header and footer
loadHeaderFooter();
