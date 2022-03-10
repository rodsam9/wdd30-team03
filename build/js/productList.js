var l = (d, t, a) =>
  new Promise((r, e) => {
    var n = (i) => {
        try {
          c(a.next(i));
        } catch (o) {
          e(o);
        }
      },
      s = (i) => {
        try {
          c(a.throw(i));
        } catch (o) {
          e(o);
        }
      },
      c = (i) => (i.done ? r(i.value) : Promise.resolve(i.value).then(n, s));
    c((a = a.apply(d, t)).next());
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
  appendProductCard(t, a) {
    return l(this, null, function* () {
      const r = document.getElementById("product-card-template");
      let e = r.content.cloneNode(!0),
        n = yield this.getList(),
        s = n[a];
      t.appendChild(e),
        (e = t.lastElementChild),
        (e.innerHTML = e.innerHTML.multiReplace([
          ["$PRODUCT_ID$", s.Id],
          ["$CATEGORY$", this.category],
          ["$IMG_SRC$", s.Images.PrimaryLarge],
          ["$IMG_DESCRIPTION$", s.Name],
          ["$BRAND$", s.Brand.Name],
          ["$NAME$", s.Name],
          ["$LIST_PRICE$", s.ListPrice],
        ]));
    });
  }
  appendProductCards(t) {
    return l(this, null, function* () {
      let a = yield this.getList();
      a.forEach((r, e) => {
        this.appendProductCard(t, e);
      });
    });
  }
}
