import e from "./productList.js";
import { loadHeaderFooter as r } from "./utils.js";
let t = document.getElementsByClassName("product-list")[0],
  d = new e("tents");
d.appendProductCard(t, 0),
  d.appendProductCard(t, 1),
  d.appendProductCard(t, 3),
  d.appendProductCard(t, 5),
  r();
