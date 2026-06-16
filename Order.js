async function getOrders() {
    const response = await fetch('http://localhost:3000/orders')

    if (!response.ok) {
        throw new Error('Lỗi server')
    }

    const orders = await response.json()

    renderOrders(orders)
}

getOrders()


function renderOrders(orders) {
    tbodyOrder.innerHTML = ''

    orders.forEach((order, index) => {
        tbodyOrder.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.supplierName}</td>
                <td>${order.purchaseDate}</td>
                <td>${order.staffInCharge}</td>
                <td>${order.orderTotal}</td>
                <td>${order.status}</td>
            </tr>
        `
    })
}

const formOrder = document.querySelector('#formOrder');
const addBtn = document.getElementById('btn-order');

if (addBtn && formOrder) {
    addBtn.addEventListener('click', function () {
        if (formOrder.style.display === 'block') {
            formOrder.style.display = 'none';
        } else {
            formOrder.style.display = 'block';
        }
    });
}
formOrder.addEventListener('submit', function (event) {
    event.preventDefault();

    const supplierName = document.getElementById('supplierName').value;
    const purchaseDate = document.getElementById('date').value;
    const staffInCharge = document.getElementById('staff').value;
    const status = document.getElementById('status').value;

    let products = []
    const items = document.querySelectorAll('.product')
    items.forEach(item => {
        products.push({
            "productId": item.querySelector('#idProduct').value,
            "productName": item.querySelector('#productName').value,
            "quantity": item.querySelector('#quanity').value,
            "unitPrice": item.querySelector('#price').value,
            "totalPrice": item.querySelector('#quanity').value * item.querySelector('#price').value
        })
    })
    const orderTotal = products.reduce((total, product) => total + product.totalPrice, 0)
    const newOrder = {
        supplierName,
        purchaseDate,
        staffInCharge,
        orderTotal,
        status,
        products
    };


    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    });
}

);
const supplierSelect = document.getElementById('supplierId');

async function getSuppliersForSelect() {
    try {
        const response = await fetch('http://localhost:3000/suppliers');

        if (!response.ok) {
            throw new Error('Lỗi khi lấy danh sách nhà cung cấp');
        }

        const suppliers = await response.json();

        supplierSelect.innerHTML = `
            <option value="">-- Chọn nhà cung cấp --</option>
        `;

        suppliers.forEach(supplier => {
            supplierSelect.innerHTML += `
                <option value="${supplier.id}">
                    ${supplier.name}
                </option>
            `;
        });

    } catch (error) {
        console.log(error);
        alert('Không lấy được danh sách nhà cung cấp');
    }
}

getSuppliersForSelect();

const addPro = document.getElementById('addPro');
const listProduct = document.getElementById('listProduct');

addPro.addEventListener('click', function () {
    listProduct.insertAdjacentHTML('beforeend', `
        <div class="product">
            <div>
                <label>Mã sản phẩm</label>
                <input type="text" class="idProduct">
            </div>

            <div>
                <label>Tên sản phẩm</label>
                <input type="text" class="productName">
            </div>

            <div>
                <label>Số lượng</label>
                <input type="text" class="quantity">
            </div>

            <div>
                <label>Đơn giá</label>
                <input type="text" class="price">
            </div>

            <div>
                <label>Thành tiền</label>
                <input type="text" class="totalPrice">
            </div>

            <button type="button" class="btn-delete-product">Xóa</button>
        </div>
    `);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete-product')) {
        e.target.closest('.product').remove();
        updateOrderTotal();
    }
});

document.addEventListener('input', function (e) {
    if (
        e.target.classList.contains('quantity') ||
        e.target.classList.contains('price')
    ) {
        const productRow = e.target.closest('.product');

        const quantity = Number(productRow.querySelector('.quantity').value);
        const price = Number(productRow.querySelector('.price').value);

        const totalPriceInput = productRow.querySelector('.totalPrice');

        totalPriceInput.value = quantity * price;

        updateOrderTotal();
    }
});

function updateOrderTotal() {
    const totalPriceInputs = document.querySelectorAll('.totalPrice');
    let total = 0;

    totalPriceInputs.forEach(input => {
        total += Number(input.value);
    });

    document.getElementById('orderTotal').textContent = total;
}