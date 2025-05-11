let cart = [];
let total = 0;

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
        existingItem.price = existingItem.quantity * price; // Correct price calculation
    } else {
        cart.push({ name, quantity: 1, price });
    }
    total += price;
    updateCartDisplay();
}

function removeFromCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
            item.price -= price; // Adjust price for the removed quantity
        } else {
            cart.splice(itemIndex, 1); // Remove item entirely if quantity is 1
        }
        total -= price;
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartBox = document.getElementById('cart-items');

    cartBox.style.display = cart.length > 0 ? 'block' : 'none';

    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item.name} x${item.quantity} - ${(item.price).toLocaleString()}đ`;

        // Create a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Hủy';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => removeFromCart(item.name, item.price / item.quantity)); // Price per item for correct total adjustment

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    cartTotal.textContent = total.toLocaleString();
}

document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    const confirmationDiv = document.getElementById("order-confirmation");

    if (!name || !phone || !address || cart.length === 0) {
        confirmationDiv.innerHTML = `<h3>❌ Vui lòng điền đầy đủ thông tin và chọn món!</h3>`;
        return;
    }

    let itemsListHTML = "<ul>";
    cart.forEach(item => {
        itemsListHTML += `<li>${item.name} x${item.quantity} - ${item.price.toLocaleString()}đ</li>`;
    });
    itemsListHTML += "</ul>";

    confirmationDiv.innerHTML = ` 
    <h3>✅ Đặt hàng thành công!</h3>
    <p><strong>Khách hàng:</strong> ${name}</p>
    <p><strong>SDT:</strong> ${phone}</p>
    <p><strong>Địa chỉ:</strong> ${address}</p>
    <p><strong>Món đã đặt:</strong></p>
    ${itemsListHTML}
    <p><strong>Tổng tiền:</strong> ${total.toLocaleString()}đ</p>
  `;

    // Optionally, clear the cart after order confirmation
    cart = [];
    total = 0;
    updateCartDisplay();
});

