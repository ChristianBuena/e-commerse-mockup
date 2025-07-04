// Sample product data
const products = [
    { id: 1, name: 'Essential Hoodie', price: 85, category: 'hoodies', collection: 'essentials' },
    { id: 2, name: 'Minimal Tee', price: 35, category: 'tees', collection: 'essentials' },
    { id: 3, name: 'Relaxed Pants', price: 95, category: 'pants', collection: 'premium' },
    { id: 4, name: 'Oversized Hoodie', price: 120, category: 'hoodies', collection: 'premium' },
    { id: 5, name: 'Basic Tee', price: 28, category: 'tees', collection: 'essentials' },
    { id: 6, name: 'Cargo Pants', price: 110, category: 'pants', collection: 'premium' },
    { id: 7, name: 'Zip Hoodie', price: 95, category: 'hoodies', collection: 'essentials' },
    { id: 8, name: 'Long Sleeve', price: 45, category: 'tees', collection: 'essentials' },
    { id: 9, name: 'Wide Leg Pants', price: 125, category: 'pants', collection: 'premium' }
];

let cart = [];
let currentPage = 'home';

// Page navigation
function showPage(page) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(page + '-page').classList.remove('hidden');
    currentPage = page;
    
    if (page === 'shop') {
        renderProducts();
    }
}

// Product rendering
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter || p.collection === filter);
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card group cursor-pointer" onclick="showProduct(${product.id})">
            <div class="bg-warm-beige h-80 mb-4 overflow-hidden flex items-center justify-center">
                <div class="product-image w-32 h-32 bg-black rounded-lg"></div>
            </div>
            <h3 class="font-bold text-lg mb-2">${product.name}</h3>
            <p class="text-gray-600 font-medium">$${product.price}</p>
        </div>
    `).join('');
}

// Product filtering
function filterProducts(category) {
    showPage('shop');
    setTimeout(() => renderProducts(category), 100);
}

// Show individual product
function showProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-title').textContent = product.name.toUpperCase();
        document.getElementById('product-price').textContent = `$${product.price}`;
        showPage('product');
    }
}

// Size and color selection
function selectSize(button) {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-black', 'text-white');
        btn.classList.add('border-gray-300');
    });
    button.classList.add('bg-black', 'text-white');
    button.classList.remove('border-gray-300');
}

function selectColor(button) {
    document.querySelectorAll('[onclick="selectColor(this)"]').forEach(btn => {
        btn.classList.remove('border-black');
        btn.classList.add('border-gray-300');
    });
    button.classList.add('border-black');
    button.classList.remove('border-gray-300');
}

// Cart functionality
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
    toggleCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice}`;
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-center py-4 border-b">
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
            </div>
            <div class="text-right">
                <p class="font-semibold">$${item.price * item.quantity}</p>
                <button onclick="removeFromCart(${index})" class="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
        </div>
    `).join('');
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

// Checkout functionality
function showCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center">
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
            </div>
            <p class="font-semibold">$${item.price * item.quantity}</p>
        </div>
    `).join('');
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    
    toggleCart();
    showPage('checkout');
}

function completeOrder() {
    alert('Thank you for your order! This is a demo checkout - no payment was processed.');
    cart = [];
    updateCartDisplay();
    showPage('home');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});