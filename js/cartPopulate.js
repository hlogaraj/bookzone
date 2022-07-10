var cartItems = localStorage.getItem("cart items");

var products = localStorage.getItem("products");

if (products != null) {
    console.log("product catalog loaded locally");
}

if (cartItems != null) {
    console.log("cart items found");
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let name = String(item.name);
        let quantity = item.quantity;
        let price = item.info.price;
        let qtyPrice = quantity * price;

        let table = document.getElementById("cart-items");

        let row = document.createElement("tr");
        row.id = name;
        let nameData = document.createElement("td");
        nameData.innerHTML = name;
        let quantityData = document.createElement("td");
        quantityData.innerHTML = quantity;
        let priceData = document.createElement("td");
        priceData.innerHTML = qtyPrice;

        row.appendChild(nameData);
        row.appendChild(quantityData);
        row.appendChild(priceData);

        table.appendChild(row);
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

