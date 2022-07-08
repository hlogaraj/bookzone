const signup = document.forms["signup-form"];

const submitUser = signup.getElementsByClassName("submit-button")[0];

const firstNameField = document.getElementById("first-name");
const lastNameField = document.getElementById("last-name");
const streetAddressField = document.getElementById("street-address");
const cityField = document.getElementById("city");
const stateField = document.getElementById("state");
const zipCodeField = document.getElementById("zip-code");
const emailField = document.getElementById("email");
const phoneNumberField = document.getElementById("phone-number");
const textConsent = document.getElementById("texts");

var shopperInfo = new Object(); //creates JSON object

const fs = require('fs');
var shoppers = JSON.parse(fs.readFileSync('shoppers.json')); 


firstNameField.addEventListener("click", function () { hideError(firstNameField); });
lastNameField.addEventListener("click", function () { hideError(lastNameField); });
streetAddressField.addEventListener("click", function () { hideError(streetAddressField); });
cityField.addEventListener("click", function () { hideError(cityField); });
stateField.addEventListener("click", function () { hideError(stateField); });
zipCodeField.addEventListener("click", function () { hideError(zipCodeField); });
emailField.addEventListener("click", function () { hideError(emailField); });
phoneNumberField.addEventListener("click", function () { hideError(phoneNumberField); });
submitUser.addEventListener("click", validateShopper);

function shopperToJSON(shopperInfo) { //takes care of storing values of the input fields into a JSON object passed as an argument
	var firstName = firstNameField.value;
	var lastName = lastNameField.value;
	var streetAddress = streetAddressField.value;
	var city = cityField.value;
	var state = stateField.value;
	var zipCode = zipCodeField.value;
	var email = emailField.value;
	var phone = phoneNumberField.value;
	var texts = textConsent.checked;
	shopperInfo = {
		"firstName": firstName,
		"lastName": lastName,
		"streetAddress": streetAddress,
		"city": city,
		"state": state,
		"ZIP": zipCode,
		"email": email,
		"phoneNumber": phone,
		"textConsent": texts
	}
	return shopperInfo;
}

function validateShopper(e) {
	let valid = true;

	valid = valid && validateName(firstNameField);
	valid = valid && validateName(lastNameField);
	valid = valid && validateName(cityField);
	valid = valid && validateStreetAddress();
	valid = valid && validateDropDown(stateField);
	valid = valid && validateZipCode();
	valid = valid && validateEmail();
	valid = valid && validatePhoneNumber();
	flagName(firstNameField);
	flagName(lastNameField);
	flagName(cityField);
	flagStreetAddress();
	flagDropDown(stateField);
	flagZipCode();
	flagEmail();
	flagPhoneNumber();

	if (!valid) {
		e.preventDefault();
	} else {
		userInfo = toJSON(shopperInfo); //after inputs are confirmed valid, executes function to store values into JSON objct
		console.log(shopperInfo); //used to check successful storage of inputs
		return valid;
	}
}

function validateName(target) {
	return /^[a-zA-Z\-\.\s]+$/.test(target.value);
}

function flagName(target) {
	if (!validateName(target)) {
		showError(target);
	}
}

function validateStreetAddress() {
	return /^\d+\s[A-z]+\s[A-z]+/.test(streetAddressField.value);
}

function flagStreetAddress() {
	if (!validateStreetAddress()) {
		showError(streetAddressField);
	}
}

function validateDropDown(field) {
	return (field.value != "none");
}

function flagDropDown(field) {
	if (!validateDropDown(field)) {
		showError(field);
	}
}

function validateZipCode() {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeField.value);
}

function flagZipCode() {
	if (!validateZipCode()) {
		showError(zipCodeField);
	}
}

function validateEmail() {
	return emailField.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function flagEmail() {
	if (!validateEmail()) {
		showError(emailField);
	}
}

function validatePhoneNumber() {
	return (phoneNumberField.value.length == 0 || (phoneNumberField.value.length == 10 && /^\d+$/.test(phoneNumberField.value)));
}

function flagPhoneNumber() {
	if (!validatePhoneNumber()) {
		showError(phoneNumberField);
	}
}

function showError(element) {
	element.parentNode.getElementsByClassName("error")[0].classList.remove("hidden");
}

function hideError(element) {
	element.parentNode.getElementsByClassName("error")[0].classList.add("hidden");
}