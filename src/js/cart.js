import { loadHeaderFooter } from "./utils.js";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  var totalCost = 0.00;
  var totalRetail = 0.00;

  if (cartItems != null) {
    let htmlItems = [];
    if (cartItems.map != null) {
      htmlItems = cartItems.map((item) => {
	    totalCost += item.FinalPrice * item.Quantity;
		totalRetail += item.SuggestedRetailPrice * item.Quantity;
		return renderCartItem(item)
	  });
    }

    document.querySelector(".cart-list").innerHTML = htmlItems.join("");
  }
  
  // Display the total and discount if there is a total
  if (totalRetail > 0.00) {
	document.getElementsByClassName("cart-total")[0].innerHTML = `Total: <span class="struck-price">$${totalRetail.toFixed(2)}</span>&ensp;<span class="discount-price">$${totalCost.toFixed(2)}</span>!`;
	document.getElementsByClassName("cart-footer")[0].removeAttribute("hidden");
  }
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price"><span class="struck-price">$${item.FinalPrice.toFixed(2)}</span>&ensp;<span class="discount-price">$${item.SuggestedRetailPrice.toFixed(2)}</span></p>
</li>`;
  return newItem;
}

// Load the cart contents and the header and footer
getCartContents();
loadHeaderFooter();
