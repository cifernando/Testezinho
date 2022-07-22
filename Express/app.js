const express = require('express');
const cors = require('cors');
const products = require('./array');

const app = express();

app.use(express.json());
app.use(cors())

app.route('/')
  .post((req, res) => {
    const arrayOfNewProducts = req.body;

    products = [...products, ...arrayOfNewProducts]

    res.status(201).json(arrayOfNewProducts);
  })
  .get((req, res) => {
    res.status(200).json(products);
  });

app.route('/:id')
  .put((req, res) => {
    const product = req.body;

    const index = products.findIndex(item => item.id === +req.params.id);

    products[index] = product;

    res.status(200).json(product);
  })
  .delete((req, res) => {
    const index = products.findIndex(item => item.id === +req.params.id);

    products.splice(index, 1);

    res.status(200).json(products);
  })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});