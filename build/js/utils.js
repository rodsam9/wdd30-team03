var i = (e, t, n) =>
  new Promise((r, a) => {
    var u = (o) => {
        try {
          c(n.next(o));
        } catch (l) {
          a(l);
        }
      },
      p = (o) => {
        try {
          c(n.throw(o));
        } catch (l) {
          a(l);
        }
      },
      c = (o) => (o.done ? r(o.value) : Promise.resolve(o.value).then(u, p));
    c((n = n.apply(e, t)).next());
  });
export function qs(e) {
  return document.querySelector(e);
}
export function getLocalStorage(e) {
  return JSON.parse(localStorage.getItem(e));
}
export function setLocalStorage(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
export function setClick(e, t) {
  qs(e).addEventListener("touchend", (n) => {
    n.preventDefault(), t();
  }),
    qs(e).addEventListener("click", t);
}
export function getParam(e) {
  const t = window.location.search,
    n = new URLSearchParams(t);
  return n.get(e);
}
String.prototype.multiReplace = function (e) {
  let t = this.toString();
  return (
    e.forEach((n) => {
      t = t.replace(n[0], n[1]);
    }),
    t
  );
};
export function renderWithTemplate(e, t, n, r) {
  let a = e.content.cloneNode(!0);
  r && (a = r(a, n)), t.appendChild(a);
}
function d(e) {
  if (e.ok) return e.text();
  throw new Error("Bad Response");
}
export function loadTemplate(e) {
  return i(this, null, function* () {
    const t = yield fetch(e).then(d),
      n = document.createElement("template");
    return (n.innerHTML = t), n;
  });
}
export function loadHeaderFooter() {
  return i(this, null, function* () {
    let e = yield loadTemplate("../partials/header.html"),
      t = yield loadTemplate("../partials/footer.html"),
      n = document.getElementsByTagName("header")[0],
      r = document.getElementsByTagName("footer")[0];
    renderWithTemplate(e, n), renderWithTemplate(t, r);
  });
}
