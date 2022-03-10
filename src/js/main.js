import ProductList from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

// Retrieve the list of products
let listElement = document.getElementsByClassName("product-list")[0];
let list = new ProductList("tents");

// Display the tents (Remove code and uncomment first line to display all tents)
//list.appendProductCards(listElement);
list.appendProductCard(listElement, 0);
list.appendProductCard(listElement, 1);
list.appendProductCard(listElement, 3);
list.appendProductCard(listElement, 5);

// Load the header and footer
loadHeaderFooter();
