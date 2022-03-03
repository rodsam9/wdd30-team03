import ProductList from "./productList.js";

let listElement = document.getElementsByClassName("product-list")[0];
let list = new ProductList("tents");
// await (new ProductList("tents")).appendProductCards();
console.log(await list.getList());
await list.appendProductCards(listElement);
