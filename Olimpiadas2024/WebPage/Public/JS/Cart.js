// cart.js

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>Precio: $${item.price.toFixed(2)}</p>
            <p>Cantidad: ${item.quantity}</p>
            <button class="remove-from-cart" data-product-id="${item.productId}">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Manejar la eliminación de productos
    cartContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = e.target.getAttribute('data-product-id');
            const updatedCart = cart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            location.reload(); // Recargar la página para actualizar el carrito
        }
    });
});
