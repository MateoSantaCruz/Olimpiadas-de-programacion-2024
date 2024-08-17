// Mostrar/Ocultar el menú desplegable
document.getElementById('login-btn').addEventListener('click', () => {
    const menu = document.getElementById('login-menu');
    menu.classList.toggle('show');
});

// Mostrar/Ocultar la barra lateral
document.getElementById('sidebar-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = sidebar.style.transform === 'translateX(0%)' ? 'translateX(100%)' : 'translateX(0%)';
});

// Cerrar la barra lateral
document.getElementById('close-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = 'translateX(100%)';
});


    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.product-item').getAttribute('data-product-id');

            // Realiza una solicitud al servidor para agregar el producto al carrito
            fetch('/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: productId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product added to cart!');
                } else {
                    alert('Failed to add product to cart.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });