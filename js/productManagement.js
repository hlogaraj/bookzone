var submitNew = document.getElementById("submit-new-product-button");
var submitUpdate = document.getElementById("submit-update-product-button");
var searchID = document.getElementById("id-search-button");


var newID = document.getElementById("new-id");
var newTitle = document.getElementById("new-title");
var newAuthor = document.getElementById("new-author");
var newDescription = document.getElementById("new-description");
var newCategory = document.getElementById("new-category");
var newQuantity = document.getElementById("new-quantity");
var newPrice = document.getElementById("new-price");

var updateID = document.getElementById("update-id");
var updateTitle = document.getElementById("update-title");
var updateAuthor = document.getElementById("update-author");
var updateDescription = document.getElementById("update-description");
var updateCategory = document.getElementById("update-category");
var updateQuantity = document.getElementById("update-quantity");
var updatePrice = document.getElementById("update-price");

var fields = [newID, newTitle, newAuthor, newDescription, newCategory, newQuantity, newPrice, updateID, updateTitle, updateAuthor, updateDescription, updateQuantity, updatePrice];

var productInfo = new Object();

var request;
var products;

if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}

request.open('GET', 'js/products.json');
request.onreadystatechange = function () {
    if ((request.status === 200) && (request.readyState === 4)) {
        json = JSON.parse(request.responseText);
        products = json[0];
        console.log(products);
    }
}
request.send();

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("click", function (e) { hideError(fields[i]) });
}

searchID.addEventListener("click", idSearch);
submitNew.addEventListener("click", validateNew);
submitUpdate.addEventListener("click", validateUpdate);

function newToJSON() { //takes care of storing values of the input fields into a JSON object passed as an argument
    var id = newID.value;
    var title = newTitle.value;
    var author = newAuthor.value;
    var description = newDescription.value;
    var category = newCategory.value;
    var quantity = newQuantity.value;
    var price = newPrice.value;
    productInfo = {
        "id": id,
        "title": title,
        "author": author,
        "description": description,
        "category": category,
        "quantity": quantity,
        "price": price
    }
    products.push(productInfo);
    products = JSON.stringify(productInfo, null, 2);
    fs.writeFile('js/products.json', productInfo, (err) => {
        if (err) {
            throw err;
        }
        console.log("New Product Saved");
        console.log(productInfo);
    })
}

function updateToJSON() {
    var id = updateID.value;
    var title = updateTitle.value;
    var author = updateAuthor.value;
    var description = updateDescription.value;
    var category = updateCategory.value;
    var quantity = updateQuantity.value;
    var price = updatePrice.value;
    productInfo = {
        "id": id,
        "title": title,
        "author": author,
        "description": description,
        "category": category,
        "quantity": quantity,
        "price": price
    }
    products[id] = productInfo;
    products = JSON.stringify(products, null, 2);
    fs.writeFile("products.json", productInfo, (err) => {
        if (err) {
            throw err;
        }
        console.log("Product Updates Saved");
        console.log(productInfo);
    })
}

function validateNew(e) {
    let valid = true;
    valid = valid && validateID(newID);
    valid = valid && validateTitle(newTitle);
    valid = valid && validateName(newAuthor);
    valid = valid && validateDescription(newDescription);
    valid = valid && validateDropDown(newCategory);
    valid = valid && validateQuantity(newQuantity);
    valid = valid && validatePrice(newPrice);

    flagID(newID);
    flagTitle(newTitle);
    flagName(newAuthor);
    flagDescription(newDescription);
    flagCategory(newCategory);
    flagQuantity(newQuantity);
    flagPrice(newPrice);

    if (valid) {
        newToJSON(); //after inputs are confirmed valid, executes function to store values into JSON objct
        return valid;
    } else {
        e.preventDefault();
    }
}

function validateUpdate(e) {
    let valid = true;
    valid = valid && validateTitle(updateTitle);
    valid = valid && validateName(updateAuthor);
    valid = valid && validateDescription(updateDescription);
    valid = valid && validateDropDown(updateCategory);
    valid = valid && validateQuantity(updateQuantity);
    valid = valid && validatePrice(updatePrice);

    flagTitle(updateTitle);
    flagName(updateAuthor);
    flagDescription(updateDescription);
    flagCategory(updateCategory);
    flagQuantity(updateQuantity);
    flagPrice(updatePrice);

    if (!valid) {
        e.preventDefault();
    } else {
        updateToJSON();
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

function validateTitle(titleField) {
    return (titleField.value.length > 0);
}

function flagTitle(titleField) {
    if (!validateTitle(titleField)) {
        showError(titleField);
    }
}

function idSearch(e) {
    var testID = updateID.value;
    for (let product in products) {
        product = products[product];
        if (product.id == testID) { //match found
            document.getElementById("id-match").classList.remove("hidden");
            console.log("match found!");
            updateAuthor.value = product.author;
            updateTitle.value = product.title;
            updateCategory.value = product.category;
            updateDescription.value = product.description;
            updateQuantity.value = product.quantity;
            updatePrice.value = product.price;
            return true;
        }
    }
    document.getElementById("id-match").classList.add("hidden");
    showError(updateID);
    console.log("no matches");
    return false;
}

function idCheck(idField) {
    var testID = idField.value;
    for (var product in products) {
        if (product.id == testID) { //match found
            document.getElementById("id-match").classList.remove("hidden");
            console.log("match found!");
            updateAuthor.value = product.author;
            updateTitle.value = product.title;
            updateCategory.value = product.category;
            updateDescription.value = product.description;
            updateQuantity.value = product.quantity;
            updatePrice.value = product.price;
            return true;
        }
    }
    document.getElementById("id-match").classList.add("hidden");
    showError(updateID);
    console.log("no matches");
    return false;
}

function validateID(idField) {
    return (/(^\d{4}$)/.test(idField.value) && !idCheck(idField.value)); //check if ID is already taken
}

function flagID(idField) {
    if (!validateID(idField)) {
        showError(idField);
    }
}

function validateQuantity(quantityField) {
    let x = Number(quantityField.value);
    return (Number.isInteger(x) && x > 0);
}
function flagQuantity(quantityField) {
    if (!validateQuantity(quantityField)) {
        showError(quantityField);
    }
}

function validateDescription(descriptionField) {
    return (descriptionField.value.length > 0);
}

function flagDescription(descriptionField) {
    if (!validateDescription(descriptionField)) {
        showError(descriptionField);
    }
}

function flagCategory(categoryField) {
    if (!validateDropDown(categoryField)) {
        showError(categoryField);
    }
}

function validatePrice(priceField) {
    var x = priceField.value;
    return ($.isNumeric(x) && x > 0);
}

function flagPrice(priceField) {
    if (!validatePrice(priceField)) {
        showError(priceField);
    }
}
