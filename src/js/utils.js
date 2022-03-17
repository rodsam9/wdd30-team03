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

/* Renders a template */
export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }

  parent.appendChild(clone);
}

/* Used by loadTemplate */
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

function applyBreadcrumb(template) {
  let text = "<ul>";
  let url = location.origin;
  
  // Get all of the possible links backwards by splitting the url for each '/' character (then rejoin them for links)
  // "http://localhost:8080/product-details?product=989CH&category=tents" would become [ , product-details?product=989CH&category=tents ]
  let pieces = location.href.replace(url, "").split("/");
  pieces.shift(); // Remove blank space
  
  // Add the index page to the beadcrumb trail
  text += `<li><a href="${url}">Home</a></li>`;
  
  // Add each link afterwards
  pieces.forEach(piece => {
    url += "/" + piece;
	
	// Calculate the title: "product-details?product=989CH&category=tents" => "Product Details"
	let title = piece.split("?")[0].split("-").map(a => a[0].toUpperCase() + a.slice(1)).join(" ");
	text += `<li><a href="${url}">${title}</a></li>`;
  });
  
  // Apply the breadcrumb trail
  text += "</ul>"
  template.innerHTML = template.innerHTML.replace("%breadcrumb%", text);
}

export async function loadHeaderFooter() {
  // Get the header and footer templates and elements
  let header = await loadTemplate("../partials/header.html");
  let footer = await loadTemplate("../partials/footer.html");
  let headerE = document.getElementsByTagName("header")[0];
  let footerE = document.getElementsByTagName("footer")[0];

  // Apply the breadcrumb trail
  applyBreadcrumb(header);

  // Apply the header and footer
  renderWithTemplate(header, headerE);
  renderWithTemplate(footer, footerE);
}
