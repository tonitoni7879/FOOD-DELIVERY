let cart = JSON.parse(localStorage.getItem('zwigato_cart')) || [];

const saveCart = () => {
    localStorage.setItem('zwigato_cart', JSON.stringify(cart));
    updateCartUI(); // From ui.js
};

const addToCart = (item) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart();
    
    // Animate cart badge
    const badge = document.getElementById('cartCount');
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
};

const updateQuantity = (id, change) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
};

const clearCart = () => {
    cart = [];
    saveCart();
};

const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
};