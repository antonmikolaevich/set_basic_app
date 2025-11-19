const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_BASE = "http://localhost:5000/api";  // your API server

router.get("/bookings", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    const response = await fetch(`${API_BASE}/bookings?page=${page}&limit=${limit}`);
    const data = await response.json();

    res.render("pages/bookings", {
      title: "Bookings",
      bookings: data.bookings,
      currentPage: data.page,
      totalPages: data.totalPages
    });

  } catch (error) {
    console.error(error);
    res.render("pages/bookings", {
      title: "Bookings",
      bookings: [],
      currentPage: 1,
      totalPages: 1,
      error: "Unable to load bookings"
    });
  }
});


// Create new booking
router.post("/bookings/create", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log("Booking creation failed:", await response.text());
      return res.redirect("/bookings?bookingError=1");
    }

    // Get the created booking's ID from the API response
    const createdBooking = await response.json();
    const bookingId = createdBooking.booking._id;

    // Redirect including the booking ID for dynamic toast
    return res.redirect(`/bookings?bookingSuccess=1&id=${bookingId}`);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.redirect("/bookings?bookingError=1");
  }
});


// Edit booking item
router.post("/bookings/:id/edit", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      console.log(await response.text());
      return res.redirect(`/bookings?bookingError=1&id=${bookingId}`);
    }

    // Redirect with booking ID for dynamic toast
    res.redirect(`/bookings?bookingUpdated=1&id=${bookingId}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/bookings?bookingError=1&id=${bookingId}`);
  }
});


// Delete booking
router.delete("/bookings/:id/delete", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return res.status(500).send("Failed to delete booking");
    }

    res.status(200).send("Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting booking");
  }
});


module.exports = router;