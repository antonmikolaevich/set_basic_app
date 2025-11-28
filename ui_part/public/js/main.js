//===============================================
//=================PRODUCTS======================
//===============================================
//1.edit button click into Product card -> result - the modal window is opened
//2.delete the Product item
//3.creation of product - create Product toats
//4.edit product - edit Product toasts
// 5.search product by ID

//1.edit button click into Product card -> result - the modal window is opened

document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  const editModalEl = document.getElementById("editProductModal");

  if (!editModalEl) return;

  // Single modal instance
  const modal = new bootstrap.Modal(editModalEl, {backdrop: true,keyboard: true,});

  // Fill form & show modal
  editButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("edit-id").value = btn.dataset.id;
      document.getElementById("edit-name").value = btn.dataset.name;
      document.getElementById("edit-description").value = btn.dataset.description;
      document.getElementById("edit-author").value = btn.dataset.author;
      document.getElementById("edit-price").value = btn.dataset.price;
      document.getElementById("edit-image").value = btn.dataset.image_path || "";

      document.getElementById("editProductForm").action = `/products/${btn.dataset.id}/edit`;

      modal.show();
    });
  });

  // Optional: manually fix leftover backdrop
  editModalEl.addEventListener("hidden.bs.modal", () => {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach(b => b.remove());
  });
});


//2.delete the Product item
//2.1 assign the deleteProductModal, define the deleteProductButton, that after the click - deleteModal is opened
//2.2 describe the action items after clicking ConfirmDeleteButton
// I our delete response to the UI, deletining the card is only on UI part, no API call is made here 


//delete product item - oopen the delete modal and after confirmation of deleting after clicking on confirmDeleteBtn
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


//3.creation of product - show modal after clicking Create Product button

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
});


//4.edit product - show modal after clicking Edit button in Product card

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // EDIT PRODUCT MODAL
  // -------------------------
  const editBtn = document.querySelectorAll(".edit-btn");
  const editModalEl = document.getElementById("editProductModal");
  const editModal = new bootstrap.Modal(editModalEl);

  editBtn.forEach(btn => {
  btn.addEventListener("click", () => {//go to the line 23-26
    editModal.show();
  });
});

  // -------------------------
  // SHOW TOAST BASED ON URL
  // -------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "";


  if (urlParams.get("error") === "1") {
    showToast(`Failed to update product with id "${productId}".`, false);
  }

  if (urlParams.get("updated") === "1") {
    showToast(`Product with id "${productId}" updated successfully!`, true);
  }
});


// 5.search product by ID

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("searchForm");
//   const resultDiv = document.getElementById("searchResult");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault(); // prevents the page from refreshing when the form is submitted. - for my understanding
//     const id = document.getElementById("searchId").value.trim();
//     if (!id) {
//       resultDiv.innerText = "Please enter a Product ID.";
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${id}`); // <-- PORT 5000
//       if (!res.ok) throw new Error("Product not found");

//       const product = await res.json();
//       resultDiv.innerHTML = `
//         <div class="card p-3">
//           <h5>${product.name}</h5>
//           <p>Product Id:${product._id}</p>
//           <p>Author: ${product.author}</p>
//           <p>Price: $${product.price}</p>
//           <p>Description: ${product.description}</p>
//         </div>
//       `;
//     } catch (err) {
//       resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
//     }
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    

    const id = document.getElementById("searchId").value.trim().toLowerCase();
    const name = document.getElementById("searchName").value.trim().toLowerCase();
    const author = document.getElementById("searchAuthor").value.trim().toLowerCase();
    const price = document.getElementById("searchPrice").value.trim();

    // select all product cards
    const cards = document.querySelectorAll(".card-wrapper");
    let hasResult = false;

    cards.forEach(wrapper => {
      const card = wrapper.querySelector(".card");
      // Get data from the card
      const cardId = card.querySelector(".card-body p.text-muted")?.innerText.trim().toLowerCase() || "";
      const cardName = card.querySelector(".card-body h5")?.innerText.trim().toLowerCase() || "";
      const cardAuthor = card.querySelectorAll(".card-footer")[0]?.innerText.trim().toLowerCase() || "";
      const cardPrice = card.querySelectorAll(".card-footer")[1]?.innerText.trim() || "";

      const matchId = !id || cardId.includes(id);
      const matchName = !name || cardName.includes(name);
      const matchAuthor = !author || cardAuthor.includes(author);
      const matchPrice = !price || cardPrice.includes(price);

      if (matchId && matchName && matchAuthor && matchPrice) {
        wrapper.style.display = "block";
        hasResult = true;
      } else {
        wrapper.style.display = "none";
      }
    });

    if (!hasResult) {
      alert("No products found.");
    }
  });
});



//============================================================================
//=================BOOKSTORE==================================================
//============================================================================
// 1.edit bookstore - edit button click into Bookstore card -> result - the modal window is opened
// 2.delete bookstore item
// 3. create bookstore item - create bookstore toasts
// 4. edit bookstore - edit bookstore toasts
// 5. search bookstore

// 1.edit bookstore - edit button click into Bookstore card -> result - the modal window is opened

document.addEventListener("DOMContentLoaded", () => {
  const editStoreButtons = document.querySelectorAll(".edit-store-btn");
  const editStoreModalEl = document.getElementById("editStoreItemModal");
  const editStoreForm = document.getElementById("editStoreItemForm");

  if (!editStoreModalEl || !editStoreForm) return;

  // Initialize Bootstrap modal only once
  const editStoreModal = new bootstrap.Modal(editStoreModalEl);

  // Fill modal form and show when clicking edit buttons
  editStoreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("edit-store-id").value = btn.dataset.id;
      document.getElementById("edit-store-product-id").value = btn.dataset.product_id;
      document.getElementById("edit-store-available").value = btn.dataset.available_qty;
      document.getElementById("edit-store-booked").value = btn.dataset.booked_qty;
      document.getElementById("edit-store-sold").value = btn.dataset.sold_qty;

      editStoreForm.action = `/bookstore/${btn.dataset.id}/edit`;
      editStoreModal.show();
    });
  });

  // Explicitly attach click listeners to cancel/close buttons
  const cancelButtons = editStoreModalEl.querySelectorAll('[data-bs-dismiss="modal"]');
  cancelButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      editStoreModal.hide();
    });
  });

  // Optional: hide modal when clicking backdrop or pressing ESC
  editStoreModalEl.addEventListener('hidden.bs.modal', () => {
    // cleanup if needed
  });
});


// 2.delete bookstore item - open the delete modal and after confirmation of deleting after clicking on confirmDeleteBookstoreBtn

document.addEventListener("DOMContentLoaded", () => {
  const deleteBookstoreModalEl = document.getElementById("deleteBookstoreModal");
  const deleteBookstoreModal = new bootstrap.Modal(deleteBookstoreModalEl);
  let bookstoreIdToDelete = null;

  // Assign delete buttons
  document.querySelectorAll(".delete-store-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      bookstoreIdToDelete = btn.dataset.id;
      deleteBookstoreModal.show();
    });
  });

  // Confirm delete button
  document.getElementById("confirmDeleteBookstoreBtn").addEventListener("click", async () => {
    if (!bookstoreIdToDelete) return;

    try {
      const response = await fetch(`/bookstore/${bookstoreIdToDelete}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Remove the card
        const card = document.querySelector(`.delete-store-btn[data-id="${bookstoreIdToDelete}"]`)?.closest(".col-md-4");
        if (card) card.remove();

        // Hide the modal
        deleteBookstoreModal.hide();

        // Show dynamic toast
        showToast(`Bookstore item with id "${bookstoreIdToDelete}" deleted!`, true);

        bookstoreIdToDelete = null;
      } else {
        showToast("Failed to delete bookstore item.", false);
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting bookstore item.", false);
    }
  });
});


// 3. create of bookstore item - show modal after clicking Create Bookstore Item button

document.addEventListener("DOMContentLoaded", () => {
  //
  // CREATE BOOKSTORE MODAL
  //
  const createStoreBtn = document.getElementById("openCreateStoreItemBtn");
  const createStoreModalEl = document.getElementById("createStoreItemModal");
  const createStoreModal = createStoreModalEl ? new bootstrap.Modal(createStoreModalEl) : null;

  if (createStoreBtn && createStoreModal) {
    createStoreBtn.addEventListener("click", () => {
      createStoreModal.show();
    });
  }
//
// BOOKSTORE TOASTS
//
 const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get("id") || "";

if (urlParams.get("storeSuccess") === "1") {
  showToast(`Bookstore item with id "${storeId}" created successfully!`, true);
}

if (urlParams.get("storeError") === "1") {
  showToast(`Failed to create bookstore item with id "${storeId}".`, false);
}

if (urlParams.get("storeUpdated") === "1") {
  showToast(`Bookstore item with id "${storeId}" updated successfully!`, true);
}
});


//4. edit bookstore - show modal after clicking Edit button in Bookstore card

document.addEventListener("DOMContentLoaded", () => {
  //
  // CREATE BOOKSTORE MODAL
  //
  const editStoreBtn = document.querySelectorAll("edit-store-btn");
  const editStoreModalEl = document.getElementById("editStoreItemModal");
  const editStoreModal = editStoreModalEl ? new bootstrap.Modal(editStoreModalEl) : null;

  editStoreBtn.forEach(btn => {
  btn.addEventListener("click", () => {//go to the line 23-26
    editStoreModal.show();
  });
});
//
// BOOKSTORE TOASTS
//
const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get("id") || "";

if (urlParams.get("storeError") === "1") {
  showToast(`Failed to update bookstore item with id "${storeId}".`, false);
}

if (urlParams.get("storeUpdated") === "1") {
  showToast(`Bookstore item with id "${storeId}" updated successfully!`, true);
}
});


//5. search bookstore

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("searchStoreForm");
//   const resultDiv = document.getElementById("searchStoreResult");

//   if (!form) return; // Prevent errors on other pages

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const id = document.getElementById("searchStoreId").value.trim();

//     if (!id) {
//       resultDiv.innerHTML = `<div class="text-danger">Please enter a Store Item ID.</div>`;
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/bookstore/${id}`);  // <-- STORE API

//       if (!res.ok) throw new Error("Store item not found");

//       const store = await res.json();

//       resultDiv.innerHTML = `
//         <div class="card p-3 mt-3">

//           <p><strong>Store Item ID:</strong> ${store._id}</p>

//           <p><strong>Product Name:</strong> ${store.product_id?.name || "N/A"}</p>
//           <p><strong>Description:</strong> ${store.product_id?.description || "N/A"}</p>
//           <p><strong>Author:</strong> ${store.product_id?.author || "N/A"}</p>
//           <p><strong>Price:</strong> $${store.product_id?.price || "N/A"}</p>

//           <hr>

//           <p><strong>Available Qty:</strong> ${store.available_qty}</p>
//           <p><strong>Booked Qty:</strong> ${store.booked_qty}</p>
//           <p><strong>Sold Qty:</strong> ${store.sold_qty}</p>

//         </div>
//       `;
//     } catch (err) {
//       resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
//     }
//   });
// });







document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchBookingForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = document.getElementById("searchUserName").value.trim().toLowerCase();
    const productName = document.getElementById("searchProductName").value.trim().toLowerCase();
    const bookingDate = document.getElementById("searchDate").value.trim().toLowerCase();
    const bookingAddress = document.getElementById("searchAddress").value.trim().toLowerCase();
    const bookingStatus = document.getElementById("searchStatus").value.trim().toLowerCase();
  
    // select all product cards
    
    const cards = document.querySelectorAll(".card-wrapper");
    let hasResult = false;

    cards.forEach(wrapper => {
      const card = wrapper.querySelector(".card");
      // Get data from the card
      const cardUserName= card.querySelectorAll(".list-group-item .ms-1")[0]?.innerText.trim().toLowerCase() || "";
      const cardProductName = card.querySelector(".card-body h5.mb-1")?.innerText.trim().toLowerCase() || "";
      const cardDate = card.querySelectorAll(".list-group-item .ms-1")[1]?.innerText.trim().toLowerCase() || "";
      const cardAddress = card.querySelectorAll(".list-group-item .ms-1")[3]?.innerText.trim().toLowerCase() || "";
      const cardStatus = card.querySelectorAll(".list-group-item .ms-1")[4]?.innerText.trim().toLowerCase() || "";

      const matchUserName = !userName || cardUserName.includes(userName);
      const matchProductName = !productName || cardProductName.includes(productName);
      const matchDate = !bookingDate || cardDate.includes(bookingDate);
      const matchAddress = !bookingAddress || cardAddress.includes(bookingAddress);
      const matchStatus = !bookingStatus || cardStatus.includes(bookingStatus);
      
      if (matchUserName && matchProductName && matchDate && matchAddress && matchStatus) {
        wrapper.style.display = "block";
        hasResult = true;
      } else {
        wrapper.style.display = "none";
      }
    });

    if (!hasResult) {
      alert("No products found.");
    }
  });
});













//============================================================
//=================TABLE EVENT LISTENER==========================

document.addEventListener("DOMContentLoaded", () => {

  let selectedStoreId = null;

  const rows = document.querySelectorAll(".store-row");
  const editBtn = document.getElementById("openEditStoreItemBtn");

  const editStoreModalEl = document.getElementById("editStoreItemModal");
  const editStoreForm = document.getElementById("editStoreItemForm");

  //
  // CLICK ROW TO SELECT
  //
  rows.forEach(row => {
    row.addEventListener("click", () => {
      // Remove previous selection
      rows.forEach(r => r.classList.remove("table-active"));

      // Highlight this row
      row.classList.add("table-active");

      // Save the selected ID
      selectedStoreId = row.dataset.product_id;
      editStoreId = row.dataset.id;

      // Enable edit/delete buttons
      editBtn.disabled = false;
      deleteBtn.disabled = false;
    });
  });

   const editStoreModal = new bootstrap.Modal(editStoreModalEl);

  //
  // GLOBAL EDIT BUTTON
  //
  editBtn.addEventListener("click", () => {
    if (!editStoreId) return;

    const row = document.querySelector(`.store-row[data-id="${editStoreId}"]`);

    document.getElementById("edit-store-id").value = row.dataset.id;
    document.getElementById("edit-store-product-id").value = row.dataset.product_id;
    document.getElementById("edit-store-available").value = row.dataset.available_qty;
    document.getElementById("edit-store-booked").value = row.dataset.booked_qty;
    document.getElementById("edit-store-sold").value = row.dataset.sold_qty;

    editStoreForm.action = `/bookstore/${row.dataset.id}/edit`;
    editStoreModal.show();
    });
});

//============================================================
//===delete

document.addEventListener("DOMContentLoaded", () => {

  let selectedStoreId = null;

  const rows = document.querySelectorAll(".store-row");
  const editBtn = document.getElementById("openEditStoreItemBtn");
  const deleteBtn = document.getElementById("openDeleteStoreItemBtn");

  // Bootstrap modal instance
  const deleteBookstoreModalEl = document.getElementById("deleteBookstoreModal");
  const deleteBookstoreModal = new bootstrap.Modal(deleteBookstoreModalEl);

  //
  // CLICK TO SELECT ROW
  //
  rows.forEach(row => {
    row.addEventListener("click", () => {

      rows.forEach(r => r.classList.remove("table-active"));
      row.classList.add("table-active");

      selectedStoreId = row.dataset.id;
      deletedStoreId = row.dataset.product_id;

      editBtn.disabled = false;
      deleteBtn.disabled = false;
    });
  });

  //
  // OPEN DELETE MODAL
  //
  deleteBtn.addEventListener("click", () => {
    if (!selectedStoreId) return;

    document.getElementById("deleteStoreIdLabel").textContent = deletedStoreId;

    window.bookstoreIdToDelete = selectedStoreId;

    // Show the modal
    deleteBookstoreModal.show();
  });


  //
  // CONFIRM DELETE
  //
  document.getElementById("confirmDeleteBookstoreBtn").addEventListener("click", async () => {
    const id = window.bookstoreIdToDelete;
    if (!id) return;

    try {
      const response = await fetch(`/bookstore/${id}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {

        const row = document.querySelector(`.store-row[data-id="${id}"]`);
        if (row) row.remove();

        deleteBookstoreModal.hide();
        showToast(`Bookstore item with id "${id}" deleted!`, true);

        selectedStoreId = null;
        window.bookstoreIdToDelete = null;
        editBtn.disabled = true;
        deleteBtn.disabled = true;

      } else {
        showToast("Failed to delete bookstore item.", false);
      }

    } catch (err) {
      console.error(err);
      showToast("Error deleting bookstore item.", false);
    }
  });

});




//============================================================================
//=================USERS=====================================================
//============================================================================

// 1.create user - create user modal
// 2.delete user
// 3.edit user - edit user modal
// 4. edit user click - after the EditModal is opened, the fields are filled with user data
// 5. search user by ID


// 1 create user modal

document.addEventListener("DOMContentLoaded", () => {
   //
  // CREATE USER MODAL
  //
  const createUserBtn = document.getElementById("openCreateUserBtn");
  const createUserModalEl = document.getElementById("createUserModal");
  const createUserModal = createUserModalEl ? new bootstrap.Modal(createUserModalEl) : null;

  if (createUserBtn && createUserModal) {
    createUserBtn.addEventListener("click", () => {
      createUserModal.show();
    });
  }
//users toasts
//
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id") || "";
// User creation toasts
if (urlParams.get("userSuccess") === "1") {
  showToast(`User with id "${userId}" created successfully!`, true);
}

if (urlParams.get("userError") === "1") {
  showToast(`Failed to create user with id "${userId}".`, false);
}
});




//=====NEW DELELE USER EVENT


document.addEventListener("DOMContentLoaded", () => {

  let selectedStoreId = null;

  const rows = document.querySelectorAll(".user-row");
  const editBtn = document.getElementById("openEditUserBtn");
  const deleteBtn = document.getElementById("openDeleteUserBtn");

  // Bootstrap modal instance
  const deleteUserModalEl = document.getElementById("deleteUserModal");
  const deleteUserModal = new bootstrap.Modal(deleteUserModalEl);

  //
  // CLICK TO SELECT ROW
  //
  rows.forEach(row => {
    row.addEventListener("click", () => {

      rows.forEach(r => r.classList.remove("table-active"));
      row.classList.add("table-active");

      selectedUserId = row.dataset.id;

      editBtn.disabled = false;
      deleteBtn.disabled = false;
    });
  });

  //
  // OPEN DELETE MODAL
  //
  deleteBtn.addEventListener("click", () => {
    if (!selectedUserId) return;

    document.getElementById("deleteUserIdLabel").textContent = selectedUserId;

    window.userIdToDelete = selectedUserId;

    // Show the modal
    deleteUserModal.show();
  });


  //
  // CONFIRM DELETE
  //
  document.getElementById("confirmDeleteUserBtn").addEventListener("click", async () => {
    const id = window.userIdToDelete;
    if (!id) return;

    try {
      const response = await fetch(`/users/${id}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {

        const row = document.querySelector(`.user-row[data-id="${id}"]`);
        if (row) row.remove();

        deleteUserModal.hide();
        showToast(`User item with id "${id}" deleted!`, true);

        selectedStoreId = null;
        window.bookstoreIdToDelete = null;
        editBtn.disabled = true;
        deleteBtn.disabled = true;

      } else {
        showToast("Failed to delete user item.", false);
      }

    } catch (err) {
      console.error(err);
      showToast("Error deleting user item.", false);
    }
  });

});







// 2. Delete user

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteUserModalEl = document.getElementById("deleteUserModal");
//   if (!deleteUserModalEl) return;

//   const deleteUserModal = new bootstrap.Modal(deleteUserModalEl);
//   let userIdToDelete = null;

//   // Delegated event listener for delete buttons
//   document.addEventListener("click", (e) => {
//     const deleteBtn = e.target.closest(".delete-user-btn");
//     if (!deleteBtn) return;

//     userIdToDelete = deleteBtn.dataset.id;
//     deleteUserModal.show();
//   });

//   // Confirm delete
//   const confirmBtn = document.getElementById("confirmDeleteUserBtn");
//   if (confirmBtn) {
//     confirmBtn.addEventListener("click", async () => {
//       if (!userIdToDelete) return;

//       try {
//         const response = await fetch(`/users/${userIdToDelete}/delete`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           const card = document.querySelector(
//             `.delete-user-btn[data-id="${userIdToDelete}"]`
//           )?.closest(".col-md-4");

//           if (card) card.remove();

//           deleteUserModal.hide();
//           showToast(`User with id "${userIdToDelete}" deleted!`, true);

//           userIdToDelete = null;
//         } else {
//           showToast("Failed to delete user.", false);
//         }
//       } catch (err) {
//         console.error(err);
//         showToast("Error deleting user.", false);
//       }
//     });
//   }
// });


// 3. edit users - show modal after clicking Edit button in User card

document.addEventListener("DOMContentLoaded", () => {
// -------------------------
// EDIT USER MODAL
// -------------------------
  const editBtns = document.querySelectorAll(".edit-user-btn");
  const editModalEl = document.getElementById("editUserModal");
  const editModal = new bootstrap.Modal(editModalEl);

// Open modal on button click
  editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
    editModal.show();
});
});

// Ensure modal closes properly on cancel/close buttons
  const modalCloseBtns = editModalEl.querySelectorAll('[data-bs-dismiss="modal"]');
  modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
  editModal.hide();
});
});

// Optional: hide modal if clicking outside or pressing ESC is causing issues
  editModalEl.addEventListener('hidden.bs.modal', () => {
// Clear form fields if needed
  document.getElementById("editUserForm").reset();
});

// -------------------------
// SHOW TOAST BASED ON URL
// -------------------------
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id") || "";

if (urlParams.get("userError") === "1") {
showToast(`Failed to update user with id "${productId}".`, false);
}

if (urlParams.get("userUpdated") === "1") {
showToast(`User with id "${productId}" updated successfully!`, true);
}
});


// 4. edit user

document.addEventListener("DOMContentLoaded", () => {
  const editUserModalEl = document.getElementById("editUserModal");
  if (!editUserModalEl) return;

  const editUserModal = new bootstrap.Modal(editUserModalEl);

  document.addEventListener("click", (e) => {
    if (e.target.matches(".edit-user-btn")) {
      e.preventDefault();

      const btn = e.target;

      // Fill modal inputs
      document.getElementById("edit-user-id").value = btn.dataset.id;
      document.getElementById("edit-user-name").value = btn.dataset.name || "";
      document.getElementById("edit-user-email").value = btn.dataset.email || "";
      document.getElementById("edit-user-phone").value = btn.dataset.phone || "";
      document.getElementById("edit-user-address").value = btn.dataset.address || "";
      document.getElementById("edit-user-login").value = btn.dataset.login || "";
      document.getElementById("edit-user-role-id").value = btn.dataset.role_id || "";

      // Set form action
      document.getElementById("editUserForm").action = `/users/${btn.dataset.id}/edit`;

      editUserModal.show();
    }
  });
});


// 5. search user

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("searchUserForm");
//   const resultDiv = document.getElementById("searchUserResult");

//   if (!form) return; // Prevent errors on other pages

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const id = document.getElementById("searchUserId").value.trim();

//     if (!id) {
//       resultDiv.innerHTML = `<div class="text-danger">Please enter a User ID.</div>`;
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${id}`); // <-- USER API

//       if (!res.ok) throw new Error("User not found");

//       const user = await res.json();

//       resultDiv.innerHTML = `
//         <div class="card p-3 mt-3">

//           <p><strong>User ID:</strong> ${user._id}</p>
//           <p><strong>Name:</strong> ${user.name || "N/A"}</p>
//           <p><strong>Email:</strong> ${user.email || "N/A"}</p>
//           <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
//           <p><strong>Address:</strong> ${user.address || "N/A"}</p>
//           <p><strong>Login:</strong> ${user.login || "N/A"}</p>

//         </div>
//       `;
//     } catch (err) {
//       resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
//     }
//   });
// });





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchUserForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = document.getElementById("searchUserName").value.trim().toLowerCase();
    const userId = document.getElementById("searchUserId").value.trim().toLowerCase();
    const userLogin = document.getElementById("searchUserLogin").value.trim().toLowerCase();
    const userEmail = document.getElementById("searchUserEmail").value.trim().toLowerCase();
    const userAddress = document.getElementById("searchAddress").value.trim().toLowerCase();

    const rows = document.querySelectorAll("#usersTableBody tr");
    let hasResult = false;

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");

      // Skip if there are no cells (e.g., "No bookstore items found" row)
      if (!cells.length) return;

      const rowUserId = cells[0].innerText.trim().toLowerCase();
      const rowUserName = cells[1].innerText.trim().toLowerCase();
      const rowLogin = cells[2].innerText.trim().toLowerCase();
      const rowEmail = cells[3].innerText.trim().toLowerCase();
      const rowAddress = cells[4].innerText.trim().toLowerCase();

      const matchUserId = !userId || rowUserId.includes(userId);
      const matchUserName = !userName || rowUserName.includes(userName);
      const matchUserLogin = !userLogin || rowLogin.includes(userLogin);
      const matchUserEmail = !userEmail || rowEmail.includes(userEmail);
      const matchUserAddress = !userAddress || rowAddress.includes(userAddress);

      if (matchUserId && matchUserName && matchUserLogin && matchUserEmail && matchUserAddress) {
        row.style.display = "";
        hasResult = true;
      } else {
        row.style.display = "none";
      }
    });

    if (!hasResult) {
      alert("No users found.");
    }
  });
});






document.addEventListener("DOMContentLoaded", () => {

  let editUserId = null;

  const rows = document.querySelectorAll(".user-row");
  const editBtn = document.getElementById("openEditUserBtn");
  const deleteBtn = document.getElementById("openDeleteUserBtn");

  const editUserModalEl = document.getElementById("editUserModal");
  const editUserForm = document.getElementById("editUserForm");
  const editUserModal = new bootstrap.Modal(editUserModalEl);

  //
  // CLICK ROW TO SELECT
  //
  rows.forEach(row => {
    row.addEventListener("click", () => {

      rows.forEach(r => r.classList.remove("table-active"));
      row.classList.add("table-active");

      editUserId = row.dataset.id;

      editBtn.disabled = false;
      deleteBtn.disabled = false;
    });
  });

  //
  // GLOBAL EDIT BUTTON
  //
  editBtn.addEventListener("click", () => {
    if (!editUserId) return;

    const row = document.querySelector(`.user-row[data-id="${editUserId}"]`);


    document.getElementById("edit-user-id-display").value = row.dataset.id;
    document.getElementById("edit-user-name").value = row.dataset.name;
    document.getElementById("edit-user-email").value = row.dataset.email;
    document.getElementById("edit-user-phone").value = row.dataset.phone;
    document.getElementById("edit-user-address").value = row.dataset.address;
    document.getElementById("edit-user-login").value = row.dataset.login;
    document.getElementById("edit-user-role-id").value = row.dataset.roleId;
 

    // Set correct form action
    editUserForm.action = `/users/${editUserId}/edit`;

    editUserModal.show();
  });
});



//============================================================================
//=================BOOKINGS==================================================
//============================================================================
// 1.create booking - create booking modal
// 2.edit booking - edit booking modal
// 3. edit click - after the EditModal is opened, the fields are filled with booking data
// 4.delete booking - delete booking modal
// 5.search booking by ID


// clicking APPROVE, REJECT or CLOSE

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".card-footer button");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const bookingId = btn.dataset.id;       // data-id from button
      const newStatus = btn.dataset.status;   // data-status from button

      if (!bookingId || !newStatus) return;

      try {
        // Call your Express UI route that proxies to API
        const response = await fetch(`/bookings/${bookingId}/status/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status_id: newStatus })
        });

        if (!response.ok) {
          alert("Error updating status.");
          return;
        }

        // Update UI immediately
        const card = btn.closest(".card");
        const statusRow = card.querySelector("ul.list-group li:nth-child(5) span");

        if (statusRow) {
          statusRow.textContent = newStatus;  // Show updated status
        }

      } catch (err) {
        console.error(err);
        alert("Failed to update booking status.");
      }
    });
  });
});


// 1.create booking - create booking modal

document.addEventListener("DOMContentLoaded", () => {
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

// 2. edit booking - edit booking modals

document.addEventListener("DOMContentLoaded", () => {
  //
  // CREATE BOOKING MODAL
  //
  const editBookingBtn = document.getElementById("edit-booking-btn");
  const editBookingModalEl = document.getElementById("editBookingModal");
  const editBookingModal = new bootstrap.Modal(editBookingModalEl);

   editBookingBtn.forEach(btn => {
  btn.addEventListener("click", () => {//go to the line 23-26
    editBookingModal.show();
  });
});

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


// 3. edit booking - edit click and opening the modal with pre-filled data after clicking Edit button in Booking card

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


// 3. delete booking - delete booking modal

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

// 5. search booking by Id

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("searchBookingForm");
//   const resultDiv = document.getElementById("searchBookingResult");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const id = document.getElementById("searchBookingId").value.trim();

//     if (!id) {
//       resultDiv.innerText = "Please enter a Booking ID.";
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/bookings/${id}`); // <-- BOOKINGS API
//       if (!res.ok) throw new Error("Booking not found");

//       const booking = await res.json();

//       resultDiv.innerHTML = `
//         <div class="card p-3">
//           <p><strong>Booking ID:</strong> ${booking._id}</p>
//           <p><strong>Product:</strong> ${booking.product_id.name}</p>
//           <p><strong>Delivery Address:</strong> ${booking.delivery_address}</p>
//           <p><strong>Delivery Time:</strong> ${booking.delivery_time}</p>
//           <p><strong>Status:</strong> ${booking.status_id.name}</p>
//           <p><strong>Quantity:</strong> ${booking.quantity}</p>
//         </div>
//       `;
//     } catch (err) {
//       resultDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
//     }
//   });
// });


// search booking on UI side

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchStoreForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const productName = document.getElementById("searchProductName").value.trim().toLowerCase();
    const productId = document.getElementById("searchProductId").value.trim().toLowerCase();
    const availableQty = document.getElementById("searchAvailableQty").value.trim().toLowerCase();
    const bookedQty = document.getElementById("searchBookedQty").value.trim().toLowerCase();
    const deliveredQty = document.getElementById("searchDeliveredQty").value.trim().toLowerCase();

    const rows = document.querySelectorAll("#storeTableBody tr");
    let hasResult = false;

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");

      // Skip if there are no cells (e.g., "No bookstore items found" row)
      if (!cells.length) return;

      const rowProductId = cells[0].innerText.trim().toLowerCase();
      const rowProductName = cells[1].innerText.trim().toLowerCase();
      const rowAvailableQty = cells[2].innerText.trim().toLowerCase();
      const rowBookedQty = cells[3].innerText.trim().toLowerCase();
      const rowDeliveredQty = cells[4].innerText.trim().toLowerCase();

      const matchProductId = !productId || rowProductId.includes(productId);
      const matchProductName = !productName || rowProductName.includes(productName);
      const matchAvailableQty = !availableQty || rowAvailableQty.includes(availableQty);
      const matchBookedQty = !bookedQty || rowBookedQty.includes(bookedQty);
      const matchDeliveredQty = !deliveredQty || rowDeliveredQty.includes(deliveredQty);

      if (matchProductId && matchProductName && matchAvailableQty && matchBookedQty && matchDeliveredQty) {
        row.style.display = "";
        hasResult = true;
      } else {
        row.style.display = "none";
      }
    });

    if (!hasResult) {
      alert("No products found.");
    }
  });
});





//==============================================
//=================TOAST FUNCTION=================
// =============================================


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