import o from "./productData.js";
import r from "./productDetails.js";
import { getParam as t, loadHeaderFooter as a } from "./utils.js";
const c = t("category"),
  d = new o(c),
  e = t("product"),
  s = new r(e, d);
s.init(), a();
