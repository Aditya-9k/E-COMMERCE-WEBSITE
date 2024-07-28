// scripts.js
let cart = [];
let totalPrice = 0;

function addToCart(productName, price, button) {
    const quantity = button.previousElementSibling.value;
    const itemPrice = price * quantity;
    
    const existingItem = cart.find(item => item.productName === productName);
    
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
        existingItem.totalPrice += itemPrice;
    } else {
        cart.push({ productName, quantity: parseInt(quantity), totalPrice: itemPrice });
    }

    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsElement.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.totalPrice;
        const listItem = document.createElement('li');
        listItem.textContent = `${item.productName} - $${item.totalPrice.toFixed(2)} (x${item.quantity})`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            cart = cart.filter(cartItem => cartItem.productName !== item.productName);
            updateCart();
        };
        listItem.appendChild(removeButton);
        cartItemsElement.appendChild(listItem);
    });

    cartCountElement.textContent = cart.length;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.product-item').forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = productName.includes(query) ? 'block' : 'none';
    });
});
