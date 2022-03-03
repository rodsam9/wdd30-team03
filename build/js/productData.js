var d = (s, t, o) =>
  new Promise((e, c) => {
    var u = (n) => {
        try {
          r(o.next(n));
        } catch (a) {
          c(a);
        }
      },
      h = (n) => {
        try {
          r(o.throw(n));
        } catch (a) {
          c(a);
        }
      },
      r = (n) => (n.done ? e(n.value) : Promise.resolve(n.value).then(u, h));
    r((o = o.apply(s, t)).next());
  });
function i(s) {
  if (s.ok) return s.json();
  throw new Error("Bad Response");
}
export default class f {
  constructor(t) {
    (this.category = t), (this.path = "json/" + t + ".json");
  }
  getData() {
    return fetch("json/tents.json")
      .then(i)
      .then((t) => t);
  }
  findProductById(t) {
    return d(this, null, function* () {
      const o = yield this.getData();
      return o.find((e) => e.Id === t);
    });
  }
}
