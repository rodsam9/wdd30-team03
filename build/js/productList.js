var l = (o, t, s) =>
  new Promise((r, e) => {
    var n = (i) => {
        try {
          c(s.next(i));
        } catch (d) {
          e(d);
        }
      },
      a = (i) => {
        try {
          c(s.throw(i));
        } catch (d) {
          e(d);
        }
      },
      c = (i) => (i.done ? r(i.value) : Promise.resolve(i.value).then(n, a));
    c((s = s.apply(o, t)).next());
  });
import p from "./productData.js";
import "./utils.js";
export default class u {
  constructor(t) {
    (this.category = t),
      (this.path = "json/" + t + ".json"),
      (this._list = null);
  }
  getList() {
    return l(this, null, function* () {
      return this._list != null
        ? this._list
        : ((this._list = yield new p(this.category).getData()), this._list);
    });
  }
  appendProductCard(t, s) {
    return l(this, null, function* () {
      const r = document.getElementById("product-card-template");
      let e = r.content.cloneNode(!0),
        n = yield this.getList(),
        a = n[s];
      t.appendChild(e),
        (e = t.lastElementChild),
        (e.innerHTML = e.innerHTML.multiReplace([
          ["$PRODUCT_ID$", a.Id],
          ["$IMG_SRC$", a.Image],
          ["$IMG_DESCRIPTION$", a.Name],
          ["$BRAND$", a.Brand.Name],
          ["$NAME$", a.Name],
          ["$LIST_PRICE$", a.ListPrice],
        ]));
    });
  }
  appendProductCards(t) {
    return l(this, null, function* () {
      let s = yield this.getList();
      s.forEach((r, e) => {
        this.appendProductCard(t, e);
      });
    });
  }
}
