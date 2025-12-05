const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_BASE = "http://localhost:5000/api";  // your API server

router.get("/bookstore", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3; // same as API

    const response = await fetch(`${API_BASE}/bookstore?page=${page}&limit=${limit}`);
    const data = await response.json();

    res.render("pages/bookstore", {
      title: "Bookstore",
      stores: data.stores,
      currentPage: data.page,
      totalPages: data.totalPages
    });

  } catch (error) {
    console.error(error);
    res.render("pages/bookstore", {
      title: "Bookstore",
      stores: [],
      currentPage: 1,
      totalPages: 1,
      error: "Unable to load bookstore items"
    });
  }
});



router.post("/bookstore/create", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/bookstore`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log("Store item creation failed:", await response.text());
      return res.redirect("/bookstore?storeError=1");
    }

    const createdStoreItem = await response.json();
    const storeId = createdStoreItem.bookStoreItem._id;

    return res.redirect(`/bookstore?storeSuccess=1&id=${storeId}`);
  } catch (error) {
    console.error("Error creating store item:", error);
    return res.redirect("/bookstore?storeError=1");
  }
});

// Edit bookstore item
router.post("/bookstore/:id/edit", async (req, res) => {
  const storeId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/bookstore/${storeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log(await response.text());
      return res.redirect(`/bookstore?storeError=1&id=${storeId}`);
    }

    return res.redirect(`/bookstore?storeUpdated=1&id=${storeId}`);
  } catch (err) {
    console.error(err);
    return res.redirect(`/bookstore?storeError=1&id=${storeId}`);
  }
});


router.delete("/bookstore/:id/delete", async (req, res) => {
  const storeId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/bookstore/${storeId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return res.status(500).send("Failed to delete bookstore item");
    }

    res.status(200).send("Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting bookstore item");
  }
});


module.exports = router;