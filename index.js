const express = require("express");
const app = express();

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 }
];

app.get("/products", (req, res) => res.json(products));

app.listen(3002, () => console.log("Product Service running on port 3002"));
