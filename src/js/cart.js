import { loadHeaderFooter } from "./utils.js";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");

  if (cartItems != null) {
    let htmlItems = [];
    if (cartItems.map === "function") {
      htmlItems = cartItems.map((item) => renderCartItem(item));
    } else if (cartItems != null) {
      htmlItems = [renderCartItem(cartItems)];
    }

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

// TODO: FIX THIS CODE
getCartContents();

// Load the header and footer
loadHeaderFooter();
