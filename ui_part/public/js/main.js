document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  const modal = new bootstrap.Modal(document.getElementById("editProductModal"));

  editButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Fill form fields
      document.getElementById("edit-id").value = btn.dataset.id;
      document.getElementById("edit-name").value = btn.dataset.name;
      document.getElementById("edit-description").value = btn.dataset.description;
      document.getElementById("edit-author").value = btn.dataset.author;
      document.getElementById("edit-price").value = btn.dataset.price;
      document.getElementById("edit-image").value = btn.dataset.image;

      // Set form action (your UI route, not API directly)
      document.getElementById("editProductForm").action = `/products/${btn.dataset.id}/edit`;

      modal.show();
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const deleteModalEl = document.getElementById("deleteConfirmModal");
  const deleteModal = new bootstrap.Modal(deleteModalEl);
  let productIdToDelete = null;

  // Assign delete buttons
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      productIdToDelete = btn.dataset.id;
      deleteModal.show();
    });
  });


  // Confirm delete button
  document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!productIdToDelete) return;

    try {
      const response = await fetch(`/products/${productIdToDelete}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Remove the card
        const card = document.querySelector(`.delete-btn[data-id="${productIdToDelete}"]`)?.closest(".col-md-4");
        if (card) card.remove();

        // Hide the modal
        deleteModal.hide();

        // Show dynamic toast
        showToast(`Product with id "${productIdToDelete}" deleted!`, true);

        productIdToDelete = null;
      } else {
        showToast("Failed to delete product.", false);
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting product.", false);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // CREATE PRODUCT MODAL
  // -------------------------
  const createBtn = document.getElementById("openCreateProductBtn");
  const createModalEl = document.getElementById("createProductModal");
  const createModal = new bootstrap.Modal(createModalEl);

  if (createBtn) {
    createBtn.addEventListener("click", () => {
      createModal.show();
    });
  }

  // -------------------------
  // SHOW TOAST BASED ON URL
  // -------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "";

  if (urlParams.get("success") === "1") {
    showToast(`Product with id "${productId}" created successfully!`, true);
  }

  if (urlParams.get("error") === "1") {
    showToast(`Failed to create product with id "${productId}".`, false);
  }

  if (urlParams.get("updated") === "1") {
    showToast(`Product with id "${productId}" updated successfully!`, true);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("searchResult");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("searchId").value.trim();
    if (!id) {
      resultDiv.innerText = "Please enter a Product ID.";
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`); // <-- PORT 5000
      if (!res.ok) throw new Error("Product not found");

      const product = await res.json();
      resultDiv.innerHTML = `
        <div class="card p-3">
          <h5>${product.name}</h5>
          <p>Author: ${product.author}</p>
          <p>Price: $${product.price}</p>
          <p>Description: ${product.description}</p>
        </div>
      `;
    } catch (err) {
      resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  //
  // CREATE PRODUCT MODAL
  //
  const createProductBtn = document.getElementById("openCreateProductBtn");
  const createProductModalEl = document.getElementById("createProductModal");
  const createProductModal = new bootstrap.Modal(createProductModalEl);

  if (createProductBtn) {
    createProductBtn.addEventListener("click", () => {
      createProductModal.show();
    });
  }

  //
  // CREATE BOOKING MODAL
  //
  const createBookingBtn = document.getElementById("openCreateBookingBtn");
  const createBookingModalEl = document.getElementById("createBookingModal");
  const createBookingModal = new bootstrap.Modal(createBookingModalEl);

  if (createBookingBtn) {
    createBookingBtn.addEventListener("click", () => {
      createBookingModal.show();
    });
  }

  //
  // SHOW TOASTS BASED ON URL
  //
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get("id") || "";

  if (urlParams.get("bookingSuccess") === "1") {
    showToast(`Booking with id "${bookingId}" created successfully!`, true);
  }

  if (urlParams.get("bookingError") === "1") {
    showToast(`Failed to create booking with id "${bookingId}".`, false);
  }

  if (urlParams.get("bookingUpdated") === "1") {
    showToast(`Booking with id "${bookingId}" updated successfully!`, true);
  }
});

//edit booking
document.addEventListener("DOMContentLoaded", () => {
  const editBookingModal = new bootstrap.Modal(document.getElementById("editBookingModal"));

  document.addEventListener("click", (e) => {
    if (e.target.matches(".edit-booking-btn")) {
      e.preventDefault(); // <--- prevent <a> from navigating
      const btn = e.target;

      document.getElementById("edit-booking-id").value = btn.dataset.id;
      document.getElementById("edit-user-id").value = btn.dataset.user_id;
      document.getElementById("edit-product-id").value = btn.dataset.product_id;
      document.getElementById("edit-delivery-address").value = btn.dataset.delivery_address;
      document.getElementById("edit-delivery-date").value = btn.dataset.delivery_date;
      document.getElementById("edit-delivery-time").value = btn.dataset.delivery_time;
      document.getElementById("edit-status-id").value = btn.dataset.status_id;
      document.getElementById("edit-quantity").value = btn.dataset.quantity;

      document.getElementById("editBookingForm").action = `/bookings/${btn.dataset.id}/edit`;

      editBookingModal.show();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
// -------------------------------
// DELETE BOOKING MODAL
// -------------------------------
const deleteBookingModalEl = document.getElementById("deleteBookingModal");
if (deleteBookingModalEl) {
const deleteBookingModal = new bootstrap.Modal(deleteBookingModalEl);
let bookingIdToDelete = null;


document.querySelectorAll(".delete-booking-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    bookingIdToDelete = btn.dataset.id;
    deleteBookingModal.show();
  });
});

// Confirm delete
document.getElementById("confirmDeleteBookingBtn").addEventListener("click", async () => {
  if (!bookingIdToDelete) return;
  try {
    const res = await fetch(`/bookings/${bookingIdToDelete}/delete`, { method: "DELETE" });
    if (res.ok) {
      const card = document.querySelector(`.delete-booking-btn[data-id="${bookingIdToDelete}"]`)?.closest(".col-md-4");
      if (card) card.remove();
      showToast(`Booking with id "${bookingIdToDelete}" deleted!`, true);
    } else {
      showToast("Failed to delete booking.", false);
    }
  } catch (err) {
    console.error(err);
    showToast("Error deleting booking.", false);
  }
  deleteBookingModal.hide();
  bookingIdToDelete = null;
});

// Cancel/close modal
deleteBookingModalEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close") || e.target.classList.contains("btn-secondary")) {
    deleteBookingModal.hide();
  }
});

}
});



document.addEventListener("DOMContentLoaded", () => {
  const deleteModalEl = document.getElementById("deleteConfirmModal");

  if (!deleteModalEl) return;

  // Initialize modal
  const deleteModal = new bootstrap.Modal(deleteModalEl, {
    backdrop: true,
    keyboard: true,
    focus: true
  });

  // Open modal when clicking delete buttons
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteModal.show();
    });
  });

  // Close modal when clicking X or No button
  deleteModalEl.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("btn-close") ||
      e.target.classList.contains("btn-secondary")
    ) {
      deleteModal.hide();
    }
  });

  // Confirm delete button
  document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    const productIdToDelete = this.dataset?.id; // adjust if needed
    // delete logic...
    deleteModal.hide(); // hides modal after deletion
  });

  // Optional: ensure any leftover backdrop is removed
  deleteModalEl.addEventListener('hidden.bs.modal', () => {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(b => b.remove());
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchBookingForm");
  const resultDiv = document.getElementById("searchBookingResult");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("searchBookingId").value.trim();

    if (!id) {
      resultDiv.innerText = "Please enter a Booking ID.";
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`); // <-- BOOKINGS API
      if (!res.ok) throw new Error("Booking not found");

      const booking = await res.json();

      resultDiv.innerHTML = `
        <div class="card p-3">
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Product:</strong> ${booking.product_id.name}</p>
          <p><strong>Delivery Address:</strong> ${booking.delivery_address}</p>
          <p><strong>Delivery Time:</strong> ${booking.delivery_time}</p>
          <p><strong>Status:</strong> ${booking.status_id.name}</p>
          <p><strong>Quantity:</strong> ${booking.quantity}</p>
        </div>
      `;
    } catch (err) {
      resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
    }
  });
});

function showToast(message, isSuccess = true) {
  const toastEl = document.getElementById("dynamicToast");
  const toastBody = toastEl.querySelector(".toast-body");

  toastBody.textContent = message;

  // Change background dynamically
  toastEl.classList.remove("text-bg-success", "text-bg-danger");
  toastEl.classList.add(isSuccess ? "text-bg-success" : "text-bg-danger");

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}