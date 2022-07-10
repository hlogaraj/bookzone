var cartItems = localStorage.getItem("cart items");

var products = localStorage.getItem("products");

if (products != null) {
    console.log("product catalog loaded locally");
}

if (cartItems != null) {
    console.log("cart items found");
    
}

if (cartItems != null) {
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];

    }
}

function addToCart(listing) {
    let name = listing.id;
    let productInfo = products[name]
    let cartInfo = []
    let quantity;
    if (cartItems[name] != null) {
        quantity = 1;
    } else {
        quantity++; 
    }
    cartInfo = [quantity, productInfo];
    cartItems[name] = cartInfo;
    localStorage.setItem("cart items", cartItems);
    console.log(cartItems);
}

