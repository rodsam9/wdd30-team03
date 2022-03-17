import d from "./productList.js";
import { getParam as o, loadHeaderFooter as p } from "./utils.js";
let t = o("product"),
  e = document.getElementsByClassName("product-list")[0],
  r = new d(t);
t != null &&
  ((document.getElementById("products-title").innerHTML =
    "Top Products: " + t[0].toUpperCase() + t.substring(1).replace("-", " ")),
  r.appendProductCard(e, 0),
  r.appendProductCard(e, 1),
  r.appendProductCard(e, 3),
  r.appendProductCard(e, 5)),
  p();
