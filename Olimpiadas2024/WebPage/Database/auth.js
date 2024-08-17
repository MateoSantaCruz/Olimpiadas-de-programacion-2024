const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/Login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al iniciar sesión.');
        }
        res.redirect('/');
    });
});

router.post('/Register', (req, res) => {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).send('Error al registrarse.');
        }
        res.redirect('/');
    });
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

router.post('/', (req, res) => {
    const { producto_id, cantidad } = req.body;
    db.query('INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)', [producto_id, cantidad], (err, results) => {
      if (err) throw err;
      res.status(201).json({ id: results.insertId });
    });
  });
  
  // Obtener carrito
  router.get('/', (req, res) => {
    db.query('SELECT * FROM carrito JOIN productos ON carrito.producto_id = productos.id', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Actualizar cantidad del carrito
  router.put('/:id', (req, res) => {
    const { cantidad } = req.body;
    db.query('UPDATE carrito SET cantidad = ? WHERE id = ?', [cantidad, req.params.id], (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
  
  // Eliminar producto del carrito
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM carrito WHERE id = ?', [req.params.id], (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
  
  // Borrar todo el carrito
  router.delete('/', (req, res) => {
    db.query('DELETE FROM carrito', (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });



module.exports = router;
