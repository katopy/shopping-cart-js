class InvoiceManager {
  constructor() {
    this.IVA_RATE = 0.13; // 13% IVA en El Salvador
    this.invoiceModal = document.getElementById("invoiceModal");
    this.closeInvoiceBtn = document.querySelector(".close-invoice");
    this.initEventListeners();
  }

  initEventListeners() {
    if (this.closeInvoiceBtn) {
      this.closeInvoiceBtn.addEventListener("click", () => {
        this.closeInvoice();
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === this.invoiceModal) {
        this.closeInvoice();
      }
    });
  }

  generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${year}${month}${day}-${random}`;
  }

  calculateSubtotal(items) {
    return items.reduce((total, item) => {
      const itemTotal = item.price * (item.quantity || 1);
      return total + itemTotal;
    }, 0);
  }

  calculateIVA(subtotal) {
    return subtotal * this.IVA_RATE;
  }

  calculateTotal(subtotal, iva) {
    return subtotal + iva;
  }

  openInvoice() {
    this.invoiceModal.style.display = "block";
    this.generateInvoice();
  }

  closeInvoice() {
    this.invoiceModal.style.display = "none";
  }

  generateInvoice() {
    const items = cart.getItems();

    if (items.length === 0) {
      alert("No hay productos en el carrito para facturar.");
      return;
    }

    const subtotal = this.calculateSubtotal(items);
    const iva = this.calculateIVA(subtotal);
    const total = this.calculateTotal(subtotal, iva);

    this.setInvoiceInfo();

    this.generateInvoiceItems(items);

    this.setInvoiceTotals(subtotal, iva, total);
  }

  setInvoiceInfo() {
    const now = new Date();

    document.getElementById("invoiceNumber").textContent =
      this.generateInvoiceNumber();
    document.getElementById("invoiceDate").textContent =
      now.toLocaleDateString("es-ES");
    document.getElementById("invoiceTime").textContent = now.toLocaleTimeString(
      "es-ES",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  }

  generateInvoiceItems(items) {
    const invoiceItemsContainer = document.getElementById("invoiceItems");
    invoiceItemsContainer.innerHTML = "";

    items.forEach((item) => {
      const quantity = item.quantity || 1;
      const itemTotal = item.price * quantity;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.product}</td>
                <td>${quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;
      invoiceItemsContainer.appendChild(row);
    });
  }

  setInvoiceTotals(subtotal, iva, total) {
    document.getElementById("invoiceSubtotal").textContent =
      subtotal.toFixed(2);
    document.getElementById("invoiceIVA").textContent = iva.toFixed(2);
    document.getElementById("invoiceFinalTotal").textContent = total.toFixed(2);
  }

  printInvoice() {
    window.print();
  }
}

const invoiceManager = new InvoiceManager();
