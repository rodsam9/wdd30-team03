import ProductList from "./productList.js";

// Retrieve the list of products
let listElement = document.getElementsByClassName("product-list")[0];
let list = new ProductList("tents");

// Display the tents (Remove code and uncomment first line to display all tents)
//await list.appendProductCards(listElement);
await list.appendProductCard(listElement, 0);
await list.appendProductCard(listElement, 1);
await list.appendProductCard(listElement, 3);
await list.appendProductCard(listElement, 5);
