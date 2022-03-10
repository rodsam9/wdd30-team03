var h = (n, t, e) =>
  new Promise((o, c) => {
    var u = (r) => {
        try {
          s(e.next(r));
        } catch (a) {
          c(a);
        }
      },
      d = (r) => {
        try {
          s(e.throw(r));
        } catch (a) {
          c(a);
        }
      },
      s = (r) => (r.done ? o(r.value) : Promise.resolve(r.value).then(u, d));
    s((e = e.apply(n, t)).next());
  });
function i(n) {
  if (n.ok) return n.json();
  throw new Error("Bad Response");
}
export default class p {
  constructor(t) {
    (this.category = t),
      (this.path = "http://157.201.228.93:2992/products/search/" + t);
  }
  getData() {
    return fetch(this.path)
      .then(i)
      .then((t) => t.Result);
  }
  findProductById(t) {
    return h(this, null, function* () {
      const e = yield this.getData();
      return e.find((o) => o.Id === t);
    });
  }
}
