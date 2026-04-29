const restaurants = [
    {
        id: "r1",
        name: "Pizza Paradise",
        rating: 4.5,
        deliveryTime: "25-30 min",
        price: "₹₹",
        cuisine: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
        menu: [
            { category: "Pizzas", items: [
                { id: "m1", name: "Margherita Pizza", price: 299, desc: "Classic cheese and tomato", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=80" },
                { id: "m2", name: "Pepperoni Pizza", price: 399, desc: "Loaded with pepperoni and cheese", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=150&q=80" }
            ]},
            { category: "Sides", items: [
                { id: "m3", name: "Garlic Bread", price: 149, desc: "Cheesy garlic breadsticks", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=150&q=80" }
            ]}
        ]
    },
    {
        id: "r2",
        name: "Burger Joint",
        rating: 4.2,
        deliveryTime: "20-25 min",
        price: "₹",
        cuisine: "Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        menu: [
            { category: "Burgers", items: [
                { id: "m4", name: "Classic Cheeseburger", price: 199, desc: "Juicy patty with melted cheese", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80" },
                { id: "m5", name: "Spicy Chicken Burger", price: 249, desc: "Crispy chicken with spicy mayo", image: "https://images.unsplash.com/photo-1615444736341-3b7c1264cb43?auto=format&fit=crop&w=150&q=80" }
            ]},
            { category: "Drinks", items: [
                { id: "m6", name: "Coke", price: 60, desc: "Chilled 330ml can", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80" }
            ]}
        ]
    },
    {
        id: "r3",
        name: "Wok This Way",
        rating: 4.6,
        deliveryTime: "35-40 min",
        price: "₹₹₹",
        cuisine: "Asian",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80",
        menu: [
            { category: "Mains", items: [
                { id: "m7", name: "Hakka Noodles", price: 220, desc: "Stir-fried noodles with veggies", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=150&q=80" },
                { id: "m8", name: "Chilli Chicken", price: 280, desc: "Spicy and tangy chicken gravy", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=150&q=80" }
            ]}
        ]
    },
    {
        id: "r4",
        name: "Green Bowl",
        rating: 4.8,
        deliveryTime: "15-20 min",
        price: "₹₹",
        cuisine: "Healthy",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        menu: [
            { category: "Salads", items: [
                { id: "m9", name: "Caesar Salad", price: 250, desc: "Fresh lettuce, croutons, and dressing", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80" }
            ]}
        ]
    }
];

// Helper to simulate fetching data
const getRestaurants = () => restaurants;
const getRestaurantById = (id) => restaurants.find(r => r.id === id);