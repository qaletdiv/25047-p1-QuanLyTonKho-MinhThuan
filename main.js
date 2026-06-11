let maxID = null;
let idPro = null;
let idPro2 = null;
let edit = false;
let edit2 = false;

const btnLogin = document.getElementById('login-btn');

if (btnLogin) {
    btnLogin.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/users?email=admin@gmail.com');

        if (!response.ok) {
            throw new Error('Lỗi server');
        }

        const user = await response.json();
        console.log(user);

        if (user[0].password === password) {
            alert('Đăng nhập thành công');
            window.location.href = "index.html";
        } else {
            alert('Mật khẩu hoặc email ko đúng');
        }
    });
}

async function getProducts() {
    const response = await fetch('http://localhost:3000/products')

    if (!response.ok) {
        throw new Error('Lỗi server')
    }

    const products = await response.json()
    /*     maxID = parseInt(products[0].id);
        products.forEach(product =>{
            if(maxID<parseInt(product.id)){
                maxID=parseInt(product.id)
            }
        }) */
    renderProducts(products)
}

if (document.getElementById('product-page')) {
    getProducts();
}

if (document.getElementById('supplier-page')) {
    getSupplier();
}

function renderProducts(products) {
    tbody.innerHTML = ''

    products.forEach((product, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="${product.name}" width="80"></td>
                <td>${product.quantity}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button onClick=editProduct('${product.id}')>Sửa</button>
                    <button onClick=deleteProduct('${product.id}')>Xóa</button>
                    
                </td>
            </tr>
        `
    })
}

const form = document.querySelector('#form-product');
const addBtn = document.getElementById('add-btn');
if (addBtn && form) {
addBtn.addEventListener('click', function () {
    if (form.style.display === 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
    }
});
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const newProduct = {
        name,
        image,
        price: parseInt(price),
        quantity: parseInt(quantity),
        category,
        description
    };
    if (edit) {
        fetch(`http://localhost:3000/products/${idPro}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
    } else {
        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
    }

});
function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log('Xóa tài nguyên thành công!');
            } else {
                console.error('Lỗi khi xóa tài nguyên.');
            }
        })
        .catch(error => console.error('Lỗi mạng:', error));
}

async function editProduct(id) {
    idPro = id;
    edit = true;
    form['button'].textContent = "sửa"
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (!response.ok) {
        throw new Error('Lỗi server');
    }

    const product = await response.json();

    const name = document.getElementById('name')
    name.value = product.name;

    const image = document.getElementById('image')
    image.value = product.image;

    const price = document.getElementById('price');
    price.value = product.price

    const quantity = document.getElementById('quantity')
    quantity.value = product.quantity;

    const category = document.getElementById('category')
    category.value = product.category;

    const description = document.getElementById('description')
    description.value = product.description;
    console.log(product);

    if (getComputedStyle(form).display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}
/* form['cancel'].addEventListener('click', function () {
    form.style.display = 'none';
})
 */




