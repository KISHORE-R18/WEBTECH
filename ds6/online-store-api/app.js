const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
