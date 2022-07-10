var cartItems = JSON.parse(localStorage.getItem("cart items"));

var products = JSON.parse(localStorage.getItem("products"));

if (products != null) {
    console.log("product catalog loaded locally");
}

if (cartItems != null) {
    console.log("cart items found");
    let table = document.getElementById("cart-items");
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let name = String(item.name);
        let quantity = parseInt(item.quantity);
        let price = parseFloat(item.price);
        let qtyPrice = quantity * price;

        let row = document.createElement("tr");
        row.id = name;
        let nameData = document.createElement("td");
        nameData.innerHTML = name;
        let quantityData = document.createElement("td");
        quantityData.innerHTML = quantity;
        let priceData = document.createElement("td");
        priceData.innerHTML = "$" + qtyPrice;

        row.appendChild(nameData);
        row.appendChild(quantityData);
        row.appendChild(priceData);

        table.appendChild(row);

        totalPrice += qtyPrice;
    }
    let row = document.createElement("tr");
    row.id = "total";
    let totalLabel = document.createElement("h3");
    totalLabel.innerHTML = "Total Price:";
    let totalLabelBox = document.createElement("td");
    totalLabelBox.appendChild(totalLabel);
    let totalData = document.createElement("td");
    totalData.colSpan = "2";
    totalData.innerHTML = "$" + totalPrice;
    table.appendChild(row);
}


