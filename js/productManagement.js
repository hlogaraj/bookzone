const submitNew = document.getElementById("submit-new-product-button");
const submitUpdate = document.getElementById("submit-update-product-button");
const searchID = document.getElementById("id-search-button");


const newID = document.getElementById("new-id");
const newTitle = document.getElementById("new-title");
const newAuthor = document.getElementById("new-author");
const newDescription = document.getElementById("new-description");
const newCategory = document.getElementById("new-category");
const newQuantity = document.getElementById("new-quantity");
const newPrice = document.getElementById("new-price");

const updateID = document.getElementById("update-id");
const updateTitle = document.getElementById("update-title");
const updateAuthor = document.getElementById("update-author");
const updateDescription = document.getElementById("update-description");
const updateCategory = document.getElementById("update-category");
const updateQuantity = document.getElementById("update-quantity");
const updatePrice = document.getElementById("update-price");

const fields = [newID, newTitle, newAuthor, newDescription, newCategory, newQuantity, newPrice, updateID, updateTitle, updateAuthor, updateDescription, updateQuantity, updatePrice];

var productInfo = new Object();

var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}

request.open('GET', 'products.json');
console.log(request);
products = JSON.parse(products);
console.log(products);

for (let i = 0; i < fields.length; i++){
    fields[i].addEventListener("click", function(e) { hideError(fields[i]) });
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
    fs.writeFile('products.json', productInfo, (err) => {
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

    flagID(updateID);
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
    testID = updateID.value;

    for (var product in products) {
        if (product.id == testID) { //match found
            document.getElementById("id-match").classList.remove("hidden");
            console.log("match found!");
            updateAuthor = product.author;
            updateTitle = product.title;
            updateCategory = product.category;
            updateDescription = product.description;
            updateQuantity = product.quantity;
            updatePrice = product.price;
            return true;
        }
    }
    document.getElementById("id-match").classList.add("hidden");
    showError(updateID);
    console.log("no matches");
    return false;
}

function validateID(idField) {
    return (/(^\d{4}$)/.test(idField.value) && !searchID(idField)); //check if ID is already taken
}

function flagID(idField) {
    if (!validateID(idField)) {
        showError(idField);
    }
}

function validateQuantity(quantityField) {
    return (Number.isInteger(quantityField.value) && quantityField.value > 0);
}

function flagQuantity(quantityField) {
    if (!validateQuantity(quantityField)) {
        showError(quantityField);
    }
}

function validateDescription(descriptionField) {
    return (descriptionField.length > 0);
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
    let x = priceField.value;
    return ($.isNumeric(x) && x.length > 0);
}

function flagPrice(priceField) {
    if (!validatePrice(priceField)) {
        showError(priceField);
    }
}
