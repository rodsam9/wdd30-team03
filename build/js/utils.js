var l = (e, t, n) =>
  new Promise((o, a) => {
    var u = (r) => {
        try {
          c(n.next(r));
        } catch (i) {
          a(i);
        }
      },
      p = (r) => {
        try {
          c(n.throw(r));
        } catch (i) {
          a(i);
        }
      },
      c = (r) => (r.done ? o(r.value) : Promise.resolve(r.value).then(u, p));
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
export function renderWithTemplate(e, t, n, o) {
  let a = e.content.cloneNode(!0);
  o && (a = o(a, n)), t.appendChild(a);
}
function d(e) {
  if (e.ok) return e.text();
  throw new Error("Bad Response");
}
export function loadTemplate(e) {
  return l(this, null, function* () {
    const t = yield fetch(e).then(d),
      n = document.createElement("template");
    return (n.innerHTML = t), n;
  });
}
function m(e) {
  let t = "";
  e.innerHTML = e.innerHTML.replace("%breadcrumb%", t);
}
export function loadHeaderFooter() {
  return l(this, null, function* () {
    let e = yield loadTemplate("../partials/header.html"),
      t = yield loadTemplate("../partials/footer.html"),
      n = document.getElementsByTagName("header")[0],
      o = document.getElementsByTagName("footer")[0];
    m(e), renderWithTemplate(e, n), renderWithTemplate(t, o);
  });
}
