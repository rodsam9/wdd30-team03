export function qs(e, t = document) {
  return t.querySelector(e);
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

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  })
}