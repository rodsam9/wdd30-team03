import { loadHeaderFooter, getLocalStorage } from "./utils.js";

const CREDIT_REGEX = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/; // ie. 1234 1234 1234 1234
const SECURITY_CODE_REGEX = /^\d{3}$/;               // ie. 123
const PHONE_REGEX = /^\(\d{3}\)\s\d{3}-\d{4}$/;      // ie. (123) 456-7890
const CHECKOUT_ELEMENT_LIST = [	"fname", "lname", "street", "city", "state", "zip", "phone", "card-number", "card-expiration", "card-code" ];

/* Displays an error onto the given element. If focusElement is set then it also moves the screen focus to that element */
function displayError(id, error, displayStyle = "inline", focusElement = "") {
	var element = document.getElementById(id);
	element.innerHTML = error;
	element.style.display = displayStyle;
	if (focusElement != "") document.getElementById(focusElement).focus();
}

/* Returns true if the element has valid data. If focusElement is set then it also moves the screen focus to that element */
function parse(id, focusElement = false) {
	// Verify that the element exists
	if (CHECKOUT_ELEMENT_LIST.indexOf(id) != -1) {
		// Hide the error message for now
		let e = document.getElementById("checkout__" + id);
		document.getElementById("checkout__" + id + "-error").style.display = "none";
		
		// Verify that the element is not empty
		if (e.value == "") {
			displayError("checkout__" + id + "-error", "Required.", "inline", focusElement ? "checkout__" + id : "");
			return false;
		}
		
		// Verify that the element has valid data
		switch (id) {
			case "phone":
				if (!PHONE_REGEX.test(e.value)) {
					displayError("checkout__" + id + "-error", "10 digits are required.", "inline", focusElement ? "checkout__" + id : "");
					return false;
				} else { return true; } break;
			case "card-number":
				if (!CREDIT_REGEX.test(e.value)) {
					displayError("checkout__" + id + "-error", "16 digits are required.", "inline", focusElement ? "checkout__" + id : "");
					return false;
				} else { return true; } break;
			case "card-code":
				if (!SECURITY_CODE_REGEX.test(e.value)) {
					displayError("checkout__" + id + "-error", "3 digits are required.", "inline", focusElement ? "checkout__" + id : "");
					return false;
				} else { return true; } break;
			default:
				return true; // We don't validate this data - it's fine as it is
		}
	} else { // It's an unknown id, of course it's invalid!
		return false;
	}
	
	// My my, how did we get here??
	return false;
}

// Taken from https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox,
// courtesy to Ta01 who authored this function.
function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

/* Forces the user to type in the format of "(XXX) XXX-XXXX" where 'X' is any digit */
function managePhoneInput() {
	var phoneElement = document.getElementById("checkout__phone");
	var phoneNumber = phoneElement.value.replaceAll(/\D/g, "");
	var newPhone = "";
	
	if (!phoneNumber.length) {
		phoneElement.value = "";
		return;
	}
	
	// First segment (525)
	if (phoneNumber.length > 3) {
		newPhone += "(" + phoneNumber.substring(0, 3) + ") ";
		phoneNumber = phoneNumber.slice(3);
	} else {
		phoneElement.value = "(" + phoneNumber.padStart(3, ' ') + ")    -    ";
		setCaretPosition("checkout__phone", 4);
		return;
	}
	
	// Second segment (525) 555
	if (phoneNumber.length > 3) {
		newPhone += phoneNumber.substring(0, 3) + "-";
		phoneNumber = phoneNumber.slice(3);	
	} else {
		phoneElement.value = newPhone + phoneNumber.padStart(3, ' ') + "-    ";
		setCaretPosition("checkout__phone", 9);
		return;
	}
	
	// Third segment (525) 555-1234
	if (phoneNumber.length > 4) {
		phoneElement.value = newPhone + phoneNumber.substring(0, 4);
	} else {
		phoneElement.value = newPhone + phoneNumber.padStart(4, ' ');
		setCaretPosition("checkout__phone", 14);
		return;
	}
}

/* Forces the user to type in a format of "XXXX XXXX XXXX XXXX" where 'X' is any digit. */
function manageCreditInput() {
	var creditNumber = document.getElementById("checkout__card-number").value.replaceAll(/\D/g, "");
	var newCredit = "";

	if (!creditNumber.length) {
		document.getElementById("checkout__card-number").value = "";
		return;
	}
	
	for (var i = 0; i < 4; i++) {
		if (creditNumber.length > 4) {
			newCredit += creditNumber.substring(0, 4) + (i == 3 ? "" : " ");
			creditNumber = creditNumber.slice(4);
		} else {
			document.getElementById("checkout__card-number").value = newCredit + creditNumber.padStart(4, ' ');
			setCaretPosition("checkout__card-number", (i + 1) * 5);
			return;
		}
	}
	
	document.getElementById("checkout__card-number").value = newCredit.substring(0, 19);
}

/* Forces the user to type in a format of "XXX" where 'X' is any digit. */
function manageSecurityCodeInput() {
	var securityCode = document.getElementById("checkout__card-code").value.replaceAll(/\D/g, "");
	document.getElementById("checkout__card-code").value = securityCode.substring(0, 3);
}

/* Forces the user to type only digits into the zip */
function manageZipInput() {
	var zip = document.getElementById("checkout__zip").value.replaceAll(/\D/g, "");
	document.getElementById("checkout__zip").value = zip;
}

/* Makes sure that all of the input data is valid */
function validate() {
	var validated = true;
	CHECKOUT_ELEMENT_LIST.forEach((id) => {
		validated = parse(id, true) ? validated : false; // Check each element to verify data integrity
	});
	
	return validated;
}

function submitPayment() {
	if (validate() == true) {
		document.getElementById("checkout-form").submit();
	}
}

function reset() {
	CHECKOUT_ELEMENT_LIST.forEach((id) => {
		document.getElementById("checkout__" + id).value = "";
		document.getElementById("checkout__" + id + "-error").style.display = "none";
	});
}

function calculateCost() {
	let cart = getLocalStorage("so-cart");
	let itemCount = 0;
	let subTotal = 0.00;
	let shipping = 8.00; // $10 for first item ($8 + $2)
	
	// Sum up the costs of each item
	cart.forEach((item) => {
		itemCount += item.Quantity;
		subTotal += item.FinalPrice * item.Quantity;
		shipping += 2.0 * item.Quantity;
	});
	
	// Calculate the tax and total costs
	let tax = subTotal * 0.06;
	let total = subTotal + shipping + tax;
	
	// Output the data
	let form = document.getElementById("checkout-form");
	form.innerHTML = form.innerHTML.multiReplace([
	  ["$ITEM_COUNT$", itemCount],
      ["$SUBTOTAL$", subTotal.toFixed(2)],
	  ["$SHIPPING$", shipping.toFixed(2)],
	  ["$TAX$", tax.toFixed(2)],
	  ["$TOTAL$", total.toFixed(2)]
    ]);
}

// Load the header and footer
loadHeaderFooter();

// Calculate the total cost
calculateCost();

// Add event listeners to each of the elements
document.getElementById("checkout__zip").addEventListener("input", manageZipInput);
document.getElementById("checkout__phone").addEventListener("input", managePhoneInput);
document.getElementById("checkout__card-number").addEventListener("input", manageCreditInput);
document.getElementById("checkout__card-code").addEventListener("input", manageSecurityCodeInput);
document.getElementById("checkout-button").addEventListener("click", submitPayment);
document.getElementById("reset-button").addEventListener("click", reset);
CHECKOUT_ELEMENT_LIST.forEach((id) => {
	document.getElementById("checkout__" + id).addEventListener("blur", () => {
		parse(id);
	});
});
