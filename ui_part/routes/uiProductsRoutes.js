const router = require("express").Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Product = require("../../src/models/Products"); // your Mongoose model

const API_BASE = "http://localhost:5000/api";  // your API server

// Homepage
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    const response = await fetch(`${API_BASE}/products?page=${page}&limit=${limit}`);
    const data = await response.json();

    res.render("pages/home", {
      title: "Manager Dashboard",
      products: data.products,
      currentPage: data.page,
      totalPages: data.totalPages
    });

  } catch (error) {
    console.error(error);
    res.render("pages/home", {
      title: "Manager Dashboard",
      products: [],
      currentPage: 1,
      totalPages: 1,
      error: "Unable to load products"
    });
  }
});


// Products page route
router.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const response = await fetch(`${API_BASE}/products?page=${page}`);
  const data = await response.json();

  res.render("pages/home", {
    title: "Products",
    products: data.products || [],
    currentPage: data.currentPage || 1,
    totalPages: data.totalPages || 1
  });
});


// Edit product item
router.post("/products/:id/edit", async (req, res) => {
  const productId = req.params.id;

  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });

  if (!response.ok) {
    console.log(await response.text());
    return res.redirect(`/products?error=1&id=${productId}`);
  }

  // Include ID in redirect
  res.redirect(`/products?updated=1&id=${productId}`);
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


// Create new product
router.post("/products/create", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log("Product creation failed:", await response.text());
      return res.redirect("/products?error=1");
    }

    // Parse the API response to get the new product's ID
    const createdProduct = await response.json();
    const productId = createdProduct.product._id; // Make sure your API returns this

    // Redirect including the product ID for the toast
    return res.redirect(`/products?success=1&id=${productId}`);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.redirect("/products?error=1");
  }
});


module.exports = router;