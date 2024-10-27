class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.totalPriceElement = document.querySelector("#total-price");
        this.emptyCart = document.getElementById("empty-cart");
        this.updateCartDisplay();
    }

    initializeEventListeners() {
        const decreaseButtons = document.querySelectorAll(".decrease-quantity");
        const increaseButtons = document.querySelectorAll(".increase-quantity");
        const deleteButtons = document.querySelectorAll(".delete-item");
        const favoriteButtons = document.querySelectorAll(".favorite-item");

        decreaseButtons.forEach((button) => {
            button.addEventListener("click", () => this.decreaseQuantity(button));
        });

        increaseButtons.forEach((button) => {
            button.addEventListener("click", () => this.increaseQuantity(button));
        });

        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => this.deleteItem(button));
        });

        favoriteButtons.forEach((button) => {
            button.addEventListener("click", () => this.toggleFavorite(button));
        });
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(
            (item) => item.product.id === product.id
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
        this.updateCartDisplay();
    }

    decreaseQuantity(button) {
        const itemContainer = button.closest(".cart-item");
        const productId = parseInt(itemContainer.dataset.id);
        const item = this.items.find((item) => item.product.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
            this.updateCartDisplay();
        }
    }

    increaseQuantity(button) {
        const itemContainer = button.closest(".cart-item");
        const productId = parseInt(itemContainer.dataset.id);
        const item = this.items.find((item) => item.product.id === productId);
        if (item) {
            item.quantity++;
            this.updateCartDisplay();
        }
    }

    deleteItem(button) {
        const itemContainer = button.closest(".cart-item");
        const productId = parseInt(itemContainer.dataset.id);
        this.items = this.items.filter((item) => item.product.id !== productId);
        this.updateCartDisplay();
    }

    toggleFavorite(button) {
        button.classList.toggle("text-red-500");
        button.classList.toggle("animate-pulse");
        button.classList.toggle("scale-150");
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    updateCartDisplay() {
        const cartItemsContainer = document.querySelector(".cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear existing items

        if (this.items.length === 0) {
            // Show empty cart message
            this.emptyCart.classList.remove("hidden");
            this.emptyCart.classList.add("flex");
        } else {
            // Hide empty cart message and display items
            this.emptyCart.classList.remove("flex");
            this.emptyCart.classList.add("hidden");

            this.items.forEach((item) => {
                const itemElement = document.createElement("div");
                itemElement.className =
                    "cart-item flex md:flex-row flex-col justify-between items-center border-b border-gray-300 pb-4 pr-4 mb-4";
                itemElement.dataset.id = item.product.id;
                itemElement.innerHTML = `
                    <img src="${item.product.image}" alt="${item.product.name}" class="w-24 h-24 object-cover rounded" />
                    <div class="flex-1 mx-4">
                        <h2 class="text-xl font-semibold">${item.product.name}</h2>
                        <p class="text-gray-600">$${item.product.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center">
                        <button class="bg-gray-200 decrease-quantity text-gray-700 p-2 rounded-full mr-2" title="Decrease Quantity">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" value="${item.quantity}" class="w-12 text-center border border-gray-300 bg-gray-100 text-gray-700 rounded" readonly />
                        <button class="bg-gray-200 increase-quantity text-gray-700 p-2 rounded-full ml-2" title="Increase Quantity">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="ml-2 text-red-500 text-lg p-3 transition-all duration-100 hover:scale-150 delete-item" title="Remove from cart">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="ml-2 text-gray-200 hover:scale-150 hover:text-pink-500 transition-all duration-100 text-lg p-3 favorite-item" title="Add to favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        this.initializeEventListeners(); // Reinitialize event listeners for new items
        this.totalPriceElement.innerText = `$${this.getTotal().toFixed(2)}`;
    }
}

// Initialize the cart
document.addEventListener("DOMContentLoaded", () => {
    const cart = new ShoppingCart();

    // Create products with images and add them to the cart
    const product1 = new Product(
        1,
        "Graphics Card",
        499.99,
        "public/images/gpu.jpg" // Adjusted image path
    );
    const product2 = new Product(
        2,
        "Motherboard",
        199.99,
        "public/images/motherboard.jpg" // Adjusted image path
    );
    const product3 = new Product(
        3,
        "CPU",
        299.99,
        "public/images/cpu.jpg" // Adjusted image path
    );
    const product4 = new Product(
        4,
        "Power Supply",
        89.99,
        "public/images/powersupply.jpg" // Adjusted image path
    );
    const product5 = new Product(
        5,
        "SSD",
        129.99,
        "public/images/ssd.jpg" // Adjusted image path
    );
    const product6 = new Product(
        6,
        "Keyboard",
        59.99,
        "public/images/keyboard.jpg" // Adjusted image path
    );

    // Add products to the cart
    cart.addItem(product1, 1);
    cart.addItem(product2, 1);
    cart.addItem(product3, 1);
    cart.addItem(product4, 1);
    cart.addItem(product5, 1);
    cart.addItem(product6, 1);
});
