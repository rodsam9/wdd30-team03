import d from "./productList.js";
import { getParam as o, loadHeaderFooter as p } from "./utils.js";
let r = o("product"),
  t = document.getElementsByClassName("product-list")[0],
  e = new d(r);
(document.getElementById("products-title").innerHTML =
  "Top Products: " + r[0].toUpperCase() + r.substring(1).replace("-", " ")),
  e.appendProductCard(t, 0),
  e.appendProductCard(t, 1),
  e.appendProductCard(t, 3),
  e.appendProductCard(t, 5),
  p();
