import { loadHeaderFooter } from "./utils.js";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");

  if (cartItems != null) {
    let htmlItems = [];
    if (cartItems.map != null) {
      htmlItems = cartItems.map((item) => renderCartItem(item));
    }

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[item.SelectedColor].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

// TODO: FIX THIS CODE
getCartContents();

// Load the header and footer
loadHeaderFooter();
