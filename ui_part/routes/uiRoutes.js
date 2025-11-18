const router = require("express").Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Product = require("../../src/models/Products"); // your Mongoose model

const API_BASE = "http://localhost:5000/api";  // your API server

// Homepage
router.get("/", async (req, res) => {
  const response = await fetch(`${API_BASE}/products`);
  const products = await response.json();

  res.render("pages/home", {
    title: "Manager Dashboard",
    products
  });
});

//Edit product item
router.post("/products/:id/edit", async (req, res) => {
  const productId = req.params.id;

  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });

  if (!response.ok) {
    console.log(await response.text());
    return res.redirect("/?error=1");
  }

  res.redirect("/?success=1");
});


router.delete("/products/:id/delete", async (req, res) => {
  const productId = req.params.id;

  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    return res.status(500).send("Failed to delete product");
  }

  res.status(200).send("Deleted");
});


router.post("/products/create", async (req, res) => {
  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });

  if (!response.ok) {
    return res.redirect("/?error=1");
  }

  return res.redirect("/?success=1");
});


module.exports = router;