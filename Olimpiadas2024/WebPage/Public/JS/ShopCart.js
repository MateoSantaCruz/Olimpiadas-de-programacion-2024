// Mostrar carrito
async function mostrarCarrito() {
    const response = await fetch('/carrito');
    const carrito = await response.json();
    const tbody = document.querySelector('#carrito tbody');
    tbody.innerHTML = '';
  
    carrito.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>
          <button onclick="restarCantidad(${producto.id})">-</button>
          ${producto.cantidad}
          <button onclick="sumarCantidad(${producto.id})">+</button>
        </td>
        <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
      `;
      tbody.appendChild(fila);
    });
  }
  
  // Funciones para manejar el carrito
  async function restarCantidad(id) {
    const response = await fetch(`/carrito/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: cantidad - 1 })
    });
    if (response.ok) mostrarCarrito();
  }
  
  async function sumarCantidad(id) {
    const response = await fetch(`/carrito/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: cantidad + 1 })
    });
    if (response.ok) mostrarCarrito();
  }
  
  async function eliminarProducto(id) {
    const response = await fetch(`/carrito/${id}`, { method: 'DELETE' });
    if (response.ok) mostrarCarrito();
  }
  
  async function borrarTodo() {
    const response = await fetch('/carrito', { method: 'DELETE' });
    if (response.ok) mostrarCarrito();
  }
  
  mostrarCarrito();
  