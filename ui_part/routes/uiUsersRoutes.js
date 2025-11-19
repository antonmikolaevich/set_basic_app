// routes/users.js
const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_BASE = "http://localhost:5000/api";

// GET all users
router.get("/users", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    const users = await response.json();

    res.render("pages/users", {
      title: "Users",
      users
    });
  } catch (err) {
    console.error(err);
    res.render("pages/users", {
      title: "Users",
      users: [],
      error: "Unable to load users"
    });
  }
});

router.post("/users/create", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log("User creation failed:", await response.text());
      return res.redirect("/users?userError=1");
    }

    const createdUser = await response.json();
    const userId = createdUser.user._id;

    return res.redirect(`/users?userSuccess=1&id=${userId}`);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.redirect("/users?userError=1");
  }
});

// Edit user
router.post("/users/:id/edit", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log(await response.text());
      return res.redirect(`/users?userError=1&id=${userId}`);
    }

    return res.redirect(`/users?userUpdated=1&id=${userId}`);
  } catch (err) {
    console.error(err);
    return res.redirect(`/users?userError=1&id=${userId}`);
  }
});


// Delete user
router.delete("/users/:id/delete", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return res.status(500).send("Failed to delete user");
    }

    res.status(200).send("Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});




module.exports = router;
