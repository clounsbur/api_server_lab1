const express = require("express");

const cartRoutes = express.Router();

// cartRoutes.get("/", (req, res) => {
//   res.send("It Lives!");
// });

const cart = [
  { id: 1, product: "milk", price: 1, quantity: 1 },
  { id: 2, product: "bread", price: 2, quantity: 1 },
  { id: 3, product: "cookies", price: 3, quantity: 1 }
];
let nextId = 4;
// 1. GET /cart-items
// a. Action: None
// b. Response: a JSON array of all cart items
// c. Response Code: 200 (OK)
cartRoutes.get("/cart-items", (req, res) => {
  res.json(cart);
});

// GET /cart-items/:id
// a. Action: None
// b. Response: a JSON object of the item with the given ID
// c. Response Code: 200 (OK)
// d. However, if the item with that ID cannot be found in the array, return a string
// response “ID Not Found” with response code 404 (Not Found)
cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  let foundItem = cart.find(aItem => aItem.id === id);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404);
    res.send(`no item with id ${id}`);
  }
});

// POST /cart-items
// a. Action: Add a cart item to the array using the JSON body of the request. Also
// generate a unique ID for that item.
// b. Response: the added cart item object as JSON.
// c. Response Code: 201 (Created)
cartRoutes.post("/cart-items", (req, res) => {
  const aItem = req.body;
  aItem.id = nextId;
  nextId++;
  cart.push(aItem);

  res.status(201);
  res.json(aItem);
});
// PUT /cart-items/:id
// a. Action: Update the cart item in the array that has the given id. Use the JSON
// body of the request as the new properties.
// b. Response: the updated cart item object as JSON.
// c. Response Code: 200 (OK).
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cart.findIndex(i => i.id === id);
  cart.splice(index, 1, item);
  res.json(item);
});

// DELETE /cart-items/:id
// a. Action: Remove the item from the array that has the given ID.
// b. Response: Empty
// c. Response Code: 204 (No Content)

cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex(i => i.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  res.sendStatus(204);
});
module.exports = cartRoutes;
