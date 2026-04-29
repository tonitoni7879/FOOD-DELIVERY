document.addEventListener('DOMContentLoaded', () => {
    // Initialize common UI components
    initTheme();
    initCartDrawer();
    updateCartUI();

    const path = window.location.pathname;

    // --- HOME PAGE LOGIC ---
    if (path.includes('index.html') || path === '/' || path.endsWith('/food-delivery/')) {
        const allData = getRestaurants();
        renderRestaurants(allData);

        // Search Logic
        const searchInput = document.getElementById('searchInput');
        searchInput?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allData.filter(r => 
                r.name.toLowerCase().includes(query) || 
                r.cuisine.toLowerCase().includes(query)
            );
            renderRestaurants(filtered);
        });

        // Filter Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                if (filter === 'all') {
                    renderRestaurants(allData);
                } else {
                    const filtered = allData.filter(r => r.cuisine === filter);
                    renderRestaurants(filtered);
                }
            });
        });
    }

    // --- RESTAURANT PAGE LOGIC ---
    if (path.includes('restaurant.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (id) {
            const restaurant = getRestaurantById(id);
            renderRestaurantDetail(restaurant);
        } else {
            renderRestaurantDetail(null);
        }

        // Active sidebar logic on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('.menu-category');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id').replace('cat-', '');
                }
            });

            document.querySelectorAll('.menu-cat-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.innerText.trim() === current) {
                    btn.classList.add('active');
                }
            });
        });
    }

    // --- CHECKOUT PAGE LOGIC ---
    if (path.includes('checkout.html')) {
        const form = document.getElementById('checkoutForm');
        
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
            window.location.href = 'index.html';
        }

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show Success Modal
            const modal = document.getElementById('successModal');
            modal.classList.add('active');
            
            // Clear cart
            clearCart();
        });
    }
});