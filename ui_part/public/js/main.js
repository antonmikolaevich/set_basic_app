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
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const deleteModalEl = document.getElementById("deleteConfirmModal");
  const deleteModal = new bootstrap.Modal(deleteModalEl);
  let productIdToDelete = null;

  deleteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      productIdToDelete = btn.dataset.id;
      deleteModal.show();
    });
  });

  document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!productIdToDelete) return;

    try {
      const response = await fetch(`/products/${productIdToDelete}/delete`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Remove card from page
        const card = document.querySelector(`.delete-btn[data-id="${productIdToDelete}"]`).closest(".col-md-4");
        if (card) card.remove();
        deleteModal.hide();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  //
  // CREATE MODAL OPEN BUTTON
  //
  const createBtn = document.getElementById("openCreateProductBtn");
  const createModalEl = document.getElementById("createProductModal");
  const createModal = new bootstrap.Modal(createModalEl);

  if (createBtn) {
    createBtn.addEventListener("click", () => {
      createModal.show();
    });
  }

  //
  // TOAST MESSAGES
  //
  const successToastEl = document.getElementById("successToast");
  const errorToastEl = document.getElementById("errorToast");
  const updatedToastEl = document.getElementById("updatedToast");

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("success") === "1") {
    const toast = new bootstrap.Toast(successToastEl);
    toast.show();
  }

  if (urlParams.get("error") === "1") {
    const toast = new bootstrap.Toast(errorToastEl);
    toast.show();
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


