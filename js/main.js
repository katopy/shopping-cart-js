const cart = new ShoppingCart();
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.querySelector(".close-cart");
const cartIcon = document.querySelector(".cart-icon");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function openCart() {
  cartModal.style.display = "block";
  renderCartItems();
}

function closeCart() {
  cartModal.style.display = "none";
}

function renderCartItems() {
  let total = 0;
  const items = cart.getItems();
  cartItemsContainer.innerHTML = "";

  if (items.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotalElement.textContent = "0.00";
    checkoutBtn.disabled = true;
    return;
  }

  items.forEach((item, index) => {
    const itemTotal = item.price * (item.quantity || 1);
    total += itemTotal;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.product}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product}</div>
                <div class="item-quantity">Cantidad: ${item.quantity || 1}</div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
    cartItemsContainer.appendChild(itemElement);
  });

  cartTotalElement.textContent = total.toFixed(2);
  checkoutBtn.disabled = false;
}

function loadEventListeners() {
  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("add-to-cart-btn")) {
        const productName = product.querySelector("h3").textContent;
        const price = parseFloat(
          product.querySelector(".product-price").textContent.replace("$", "")
        );
        const imgName = product.querySelector("img").name;

        cart.addItem({
          product: productName,
          price: price,
          image: imgName ? `images/${imgName}.png` : "images/no-available.png",
        });
        updateCartUI();

        const button = e.target;
        button.textContent = "Added!";
        button.style.backgroundColor = "#4caf50";
        setTimeout(() => {
          button.textContent = "Add to Cart";
          button.style.backgroundColor = "";
        }, 1000);
      }
    });
  });

  cartIcon.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      closeCart();
      invoiceManager.openInvoice();
      setTimeout(() => {
        cart.items = [];
        updateCartUI();
      }, 1000);
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCart();
    }
  });

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.getAttribute("data-index");
      const items = cart.getItems();
      if (items[index]) {
        cart.removeItem(items[index]);
        updateCartUI();
        renderCartItems();
      }
    }
  });
}

function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const items = cart.getItems();
    console.log(items);
    const itemCount = items.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    cartCount.textContent = itemCount;
    cartCount.style.display = "flex";

    if (cartModal.style.display === "block") {
      renderCartItems();
    }
  }
}

document.addEventListener("DOMContentLoaded", loadEventListeners);
