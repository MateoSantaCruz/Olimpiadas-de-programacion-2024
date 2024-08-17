// Función para agregar al carrito
async function agregarAlCarrito(id, precio) {
    const response = await fetch('/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto_id: id, cantidad: 1 })
    });
    if (response.ok) {
      alert('Producto añadido al carrito');
    }
  }
  