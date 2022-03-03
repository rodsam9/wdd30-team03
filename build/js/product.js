import t from "./productData.js";
import o from "./productDetails.js";
import { getParam as r } from "./utils.js";
const c = new t("tents"),
  a = r("product"),
  s = new o(a, c);
s.init();
