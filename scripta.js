// Elementlarni olish
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout');
const loginPage = document.getElementById('login-page');
const dashboard = document.getElementById('dashboard');

const createProductForm = document.getElementById('create-product-form');
const productTableBody = document.querySelector('#product-table tbody');

const validUsername = "admin";
const validPassword = "12345";

let products = JSON.parse(localStorage.getItem('products')) || [];
let isLoggedIn = localStorage.getItem('isLoggedIn') === "true";

// Kirish holatini tekshirish
function checkLoginStatus() {
    if (isLoggedIn) {
        loginPage.classList.remove('active');
        dashboard.classList.add('active');
    } else {
        loginPage.classList.add('active');
        dashboard.classList.remove('active');
    }
}

// Kirish funksiyasi
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        localStorage.setItem('isLoggedIn', "true");
        loginPage.classList.remove('active');
        dashboard.classList.add('active');
    } else {
        alert('Invalid credentials');
    }
});

// Logout funksiyasi
logoutButton.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', "false");
    loginPage.classList.add('active');
    dashboard.classList.remove('active');
});

// Mahsulotlarni localStorage-ga saqlash
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Mahsulotlarni sahifaga chiqarish
function renderProducts() {
    productTableBody.innerHTML = ''; // Oldingi ma'lumotlarni tozalash
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });

    // Edit va Delete tugmalarini ulash
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', () => editProduct(button.dataset.index));
    });
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', () => deleteProduct(button.dataset.index));
    });
}

// Mahsulot qo‘shish
createProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    products.push({ name, price });
    saveProductsToLocalStorage();
    renderProducts();
    createProductForm.reset();
});

// Mahsulotni o‘chirish
function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        saveProductsToLocalStorage();
        renderProducts();
    }
}

// Mahsulotni tahrirlash
function editProduct(index) {
    const product = products[index];
    const newName = prompt("Enter new product name:", product.name);
    const newPrice = prompt("Enter new product price:", product.price);

    if (newName && newPrice) {
        products[index] = { name: newName, price: newPrice };
        saveProductsToLocalStorage();
        renderProducts();
    }
}

// Sahifani yangilaganda login holatini tekshirish
checkLoginStatus();
renderProducts();