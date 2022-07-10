var request;
var products;

var cartItems = [];

if (localStorage.getItem("cart items") != null) {
    cartItems = localStorage.getItem("cart items");
}

var productListings = document.getElementsByClassName("product-listing");
for (let i = 0; i < productListings.length; i++) {
    productListings[i].addEventListener("click", function (e) { addToCart(productListings[i]) });
}

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
        localStorage.setItem('products', products);
        console.log("Products loaded externally");
        console.log(products);
    }
}
request.send();

function addToCart(listing) {
    let name = listing.id;
    let existing = false;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == name) { //adding to existing quantity
            newQuantity = cartItems[i].quantity + 1;
            cartItems[i].quantity = newQuantity;
            existing = true;
        }
    }

    if (!existing) { //creating new slot in cart items
        let productInfo = products[name];
        let item = {
            name: name,
            info: productInfo,
            quantity: 1
        }
        cartItems.push(item);
    }
    localStorage.setItem("cart items", cartItems);
    console.log(cartItems);
}

