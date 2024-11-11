document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
});

function loadProduct() {
    fetch('/api/products')
        .then((response) => response.json())
        .then((products) => displayProducts(products));
}

function displayProducts(products) {
    const productTableBody = document.querySelector('#productTable tbody');

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="add-to-cart-btn" data-product-id="${product.id}">담기</button></td>
        `
        // <td><button onclick="addToCart(${product.id})">담기</button></td>
        productTableBody.appendChild(row);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        })
    })
}

function addToCart(productId) {
    // fetch 구현필요...
    console.log(`FETCH 구현필요 ${productId} 를 담아서 보내기...`);
}
