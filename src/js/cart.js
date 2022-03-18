import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.js";

export function alterQuantity(item, new_quantity) {
  let cart = getLocalStorage("so-cart");
  let cartItem = cart.find(
    (it) => it.Id == item.Id && it.SelectedColor == item.SelectedColor
  );
  cartItem.Quantity = new_quantity;
  setLocalStorage("so-cart", cart);

  // Reload the cart
  getCartContents();
}

export function removeItem(item) {
  const cart = getLocalStorage("so-cart");
  setLocalStorage(
    "so-cart",
    cart.filter(
      (it) => it.Id != item.Id || it.SelectedColor != item.SelectedColor
    )
  );

  // Reload the cart
  getCartContents();
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  var totalCost = 0.0;
  var totalRetail = 0.0;

  if (cartItems != null) {
    let htmlItems = [];
    if (cartItems.map != null) {
      htmlItems = cartItems.map((item) => {
        totalCost += item.FinalPrice * item.Quantity;
        totalRetail += item.SuggestedRetailPrice * item.Quantity;
        return renderCartItem(item);
      });
    }

    document.querySelector(".cart-list").innerHTML = htmlItems.join("");

    // Bind functions to the button and quantity input
    let buttons = document.getElementsByClassName("cart-card__remove-button");
    let inputs = document.getElementsByClassName("cart-card__quantity-input");
    for (let i = 0; i < buttons.length; i++) {
      (function () {
        var item = cartItems[i];
        buttons[i].addEventListener("click", () => {
          removeItem(item);
        });
        inputs[i].addEventListener("change", () => {
          alterQuantity(item, inputs[i].value);
          inputs[i].focus();
        });
      })(); // Invoke function immediately to prevent all pointers from pointing to the same element
    }
  }

  // Display the total and discount if there is a total
  if (totalRetail > 0.0) {
    document.getElementsByClassName(
      "cart-total"
    )[0].innerHTML = `Total: <span class="struck-price">$${totalRetail.toFixed(
      2
    )}</span>&ensp;<span class="discount-price">$${totalCost.toFixed(
      2
    )}</span>!`;
    document.getElementsByClassName("cart-footer")[0].removeAttribute("hidden");
  } else {
    document.getElementsByClassName("cart-footer")[0].hidden = true;
  }
}

function renderCartItem(item) {
  const newItem = `<div class="cart-card__remove-button">X</div>
  <li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[item.SelectedColor].ColorName}</p>
  <label class="cart-card__quantity" for="cart-card__quantity-input">qty: </label>
  <input type="number" name="cart-card__quantity-input" class="cart-card__quantity-input" value="${
    item.Quantity
  }" min="1" max="99">
  <p class="cart-card__price"><span class="struck-price">$${item.SuggestedRetailPrice.toFixed(
    2
  )}</span>&ensp;<span class="discount-price">$${item.FinalPrice.toFixed(
    2
  )}</span></p>
</li>`;

  return newItem;
}

// Load the cart contents and the header and footer
getCartContents();
loadHeaderFooter();
