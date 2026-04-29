// --- Theme Management ---
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('zwigato_theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.hasAttribute('data-theme');
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('zwigato_theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('zwigato_theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });
};

// --- Cart UI ---
const initCartDrawer = () => {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');

    const toggleCart = () => {
        cartDrawer.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    };

    cartToggle?.addEventListener('click', toggleCart);
    closeCart?.addEventListener('click', toggleCart);
    cartOverlay?.addEventListener('click', toggleCart);
};

const updateCartUI = () => {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = totalItems;

    // Update Drawer List
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Update Totals
    const subtotal = getCartTotal();
    const subtotalEl = document.getElementById('cartSubtotal');
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;

    // Update Checkout Page specific elements if they exist
    renderCheckoutSummary();
};

// --- Render Home Page ---
const renderRestaurants = (data) => {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;
    
    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No restaurants found.</p>';
        return;
    }

    grid.innerHTML = data.map(r => `
        <div class="restaurant-card" onclick="window.location.href='restaurant.html?id=${r.id}'">
            <img src="${r.image}" alt="${r.name}" class="card-img">
            <div class="card-content">
                <div class="card-title">
                    <span>${r.name}</span>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${r.rating}</span>
                </div>
                <div class="card-meta">
                    <span>${r.cuisine}</span>
                    <span>${r.price} • ${r.deliveryTime}</span>
                </div>
            </div>
        </div>
    `).join('');
};

// --- Render Menu Page ---
const renderRestaurantDetail = (restaurant) => {
    if (!restaurant) {
        document.querySelector('main').innerHTML = '<h2 style="text-align:center; margin-top: 50px;">Restaurant not found</h2>';
        return;
    }

    // Header
    document.getElementById('restaurantHeader').innerHTML = `
        <img src="${restaurant.image}" class="rh-img" alt="${restaurant.name}">
        <div class="rh-info">
            <h1>${restaurant.name}</h1>
            <div class="rh-meta">
                <span><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
                <span>${restaurant.cuisine}</span>
                <span><i class="fa-regular fa-clock"></i> ${restaurant.deliveryTime}</span>
            </div>
        </div>
    `;

    // Sidebar & Menu
    const sidebar = document.getElementById('menuSidebar');
    const menuList = document.getElementById('menuItemsList');

    sidebar.innerHTML = restaurant.menu.map((m, idx) => `
        <button class="menu-cat-btn ${idx === 0 ? 'active' : ''}" onclick="scrollToCategory('${m.category}')">
            ${m.category}
        </button>
    `).join('');

    menuList.innerHTML = restaurant.menu.map(m => `
        <div class="menu-category" id="cat-${m.category}">
            <h2>${m.category}</h2>
            ${m.items.map(item => `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="item-price">₹${item.price}</p>
                        <p class="item-desc">${item.desc}</p>
                    </div>
                    <button class="add-btn" onclick="addMenuItemToCart('${item.id}', '${item.name}', ${item.price})">ADD</button>
                </div>
            `).join('')}
        </div>
    `).join('');
};

// Expose add to cart globally for inline onclick handlers
window.addMenuItemToCart = (id, name, price) => addToCart({ id, name, price });

window.scrollToCategory = (cat) => {
    const el = document.getElementById(`cat-${cat}`);
    const offset = 80; // Navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
};

// --- Render Checkout Page ---
const renderCheckoutSummary = () => {
    const chkItems = document.getElementById('checkoutItems');
    if (!chkItems) return;

    if (cart.length === 0) {
        chkItems.innerHTML = '<p class="text-muted">No items in order.</p>';
        document.getElementById('chkSubtotal').textContent = '₹0.00';
        document.getElementById('chkTotal').textContent = '₹0.00';
        document.getElementById('chkDelivery').textContent = '₹0.00';
        return;
    }

    chkItems.innerHTML = cart.map(item => `
        <div class="receipt-row">
            <span>${item.qty}x ${item.name}</span>
            <span>₹${(item.price * item.qty).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = getCartTotal();
    const delivery = 40; // Fixed delivery fee
    const total = subtotal + delivery;

    document.getElementById('chkSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('chkDelivery').textContent = `₹${delivery.toFixed(2)}`;
    document.getElementById('chkTotal').textContent = `₹${total.toFixed(2)}`;
};