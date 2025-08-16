let cartItems = [];

function loadEventListeners() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('add-to-cart-btn')) {
                const price = product.querySelector('.product-price').textContent;
                addToCart(product, price);
                return;
            }
            
            console.log('--- Product Info ---');
            console.log('Name:', productName);
            console.log('Price:', price);
            console.log('Stock:', stock);
            console.log('-------------------');
        });
    });
}

function addToCart(product, price) {
    const priceValue = parseFloat(price.replace('$', ''));
    
    cartItems.push({
        name: product.querySelector('h3').textContent,
        price: priceValue
    });
    
    updateCartTotal();
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    console.log('--- Cart Updated ---');
    console.log('Items in cart:', cartItems.length);
    console.log('Total: $' + total.toFixed(2));
    console.log('-------------------');
    
    // TODO: Update the UI
}

document.addEventListener('DOMContentLoaded', loadEventListeners);