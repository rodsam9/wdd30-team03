// wrapper for querySelector...returns matching element
export function qs(selector) {
  return document.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/*************************************************************************************
 * A multi-string replace function. It takes multiple "replace A with B" parameters. *
 * An example may look like this:                                                    *
 * parameters = [["dog", "cat"], ["pepperoni", "cheese"], ["2", "3"]]                *
 * text = "The big dog ate 2 pepperoni pizzas."                                      *
 * text.multiReplace(parameters) == "The big cat ate 3 cheese pizzas."               *
 *************************************************************************************/
String.prototype.multiReplace = function (parameters) {
  let newStr = this.toString();
  parameters.forEach((args) => {
    newStr = newStr.replace(args[0], args[1]);
  });
  return newStr;
};
