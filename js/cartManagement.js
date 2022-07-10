var request;
var products;

var cartItems = [];

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
    cartItems.push(products[name]);
    localStorage.setItem("cart items", cartItems);
    console.log(cartItems);
}

