import{loadHeaderFooter as m,getLocalStorage as l,setLocalStorage as u}from"./utils.js";export function alterQuantity(t,a){let r=l("so-cart"),c=r.find(n=>n.Id==t.Id&&n.SelectedColor==t.SelectedColor);c.Quantity=a,u("so-cart",r),o()}export function removeItem(t){const a=l("so-cart");u("so-cart",a.filter(r=>r.Id!=t.Id||r.SelectedColor!=t.SelectedColor)),o()}function o(){let t="";const a=l("so-cart");var r=0,c=0;if(a!=null){let n=[];a.map!=null&&(n=a.map(e=>(r+=e.FinalPrice*e.Quantity,c+=e.SuggestedRetailPrice*e.Quantity,p(e)))),document.querySelector(".cart-list").innerHTML=n.join("");let i=document.getElementsByClassName("cart-card__remove-button"),s=document.getElementsByClassName("cart-card__quantity-input");for(let e=0;e<i.length;e++)(function(){var d=a[e];i[e].addEventListener("click",()=>{removeItem(d)}),s[e].addEventListener("change",()=>{alterQuantity(d,s[e].value),s[e].focus()})})()}c>0?(document.getElementsByClassName("cart-total")[0].innerHTML=`Total: <span class="struck-price">$${c.toFixed(2)}</span>&ensp;<span class="discount-price">$${r.toFixed(2)}</span>!`,document.getElementsByClassName("cart-footer")[0].removeAttribute("hidden")):document.getElementsByClassName("cart-footer")[0].hidden=!0}function p(t){const a=`<div class="cart-card__remove-button">X</div>
  <li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Images.PrimaryMedium}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[t.SelectedColor].ColorName}</p>
  <label class="cart-card__quantity" for="cart-card__quantity-input">qty: </label>
  <input type="number" name="cart-card__quantity-input" class="cart-card__quantity-input" value="${t.Quantity}" min="1" max="99">
  <p class="cart-card__price"><span class="struck-price">$${t.SuggestedRetailPrice.toFixed(2)}</span>&ensp;<span class="discount-price">$${t.FinalPrice.toFixed(2)}</span></p>
</li>`;return a}o(),m();
