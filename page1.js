// page1.js

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("panier")) || [];
  document.querySelector(".cart").textContent = `🛒 (${cart.length})`;
}

function renderCartContents() {
  const cart = JSON.parse(localStorage.getItem("panier")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toFixed(2)} TND`;
    cartItemsContainer.appendChild(li);
    total += item.price;
  });

  cartTotalSpan.textContent = total.toFixed(2);
}

function toggleCartDisplay() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
    renderCartContents();
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}

function checkout() {
  alert("Merci pour votre commande !");
  localStorage.removeItem("panier");
  updateCartCount();
  renderCartContents();
  document.getElementById("cart-container").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  document.querySelector(".cart").addEventListener("click", toggleCartDisplay);

  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");

      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="100%">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <h3>${product.price.toFixed(2)} TND</h3>
          <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Ajouter au panier</button>
        `;

        productList.appendChild(card);
      });

      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
          const name = button.getAttribute("data-name");
          const price = parseFloat(button.getAttribute("data-price"));

          let panier = JSON.parse(localStorage.getItem("panier")) || [];
          panier.push({ name, price });
          localStorage.setItem("panier", JSON.stringify(panier));
          alert(`${name} a été ajouté au panier !`);
          updateCartCount();
        });
      });
    })
    .catch((error) => {
      console.error("Erreur de chargement des produits :", error);
    });
});


  //dark mode//
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  }