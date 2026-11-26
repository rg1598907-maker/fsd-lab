
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const message = document.getElementById('message');

// Fetch and display products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();

        productList.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Price:</strong> ₹${product.price}</p>
                <p><strong>Rating:</strong> ⭐ ${product.rating}/5</p>
            `;

            productList.appendChild(card);
        });

        if (products.length === 0) {
            productList.textContent = 'No products available.';
        }

    } catch (error) {
        productList.textContent = error.message;
    }
}

// Add new product
productForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const rating = document.getElementById('rating').value;

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: Number(price),
                rating: Number(rating)
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        message.textContent = result.message;
        message.style.color = 'green';

        productForm.reset();

        // Refresh product list
        loadProducts();

    } catch (error) {
        message.textContent = error.message;
        message.style.color = 'red';
    }
});

// Load products when page opens
loadProducts();