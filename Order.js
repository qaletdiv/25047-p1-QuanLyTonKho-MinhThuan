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
    const orderTotal = products.reduce((total,product) => total + product.totalPrice, 0)
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


const addPro = document.querySelector('#addPro')
const listPro = document.querySelector('#listProduct')
if (addPro) {
    addPro.addEventListener('click', function (event) {
        event.preventDefault();
        listPro.innerHTML += `
                 <div class="product">
                    <div>
                        <label for="">Mã sản phẩm</label>
                        <input type="text" id="idProduct">
                    </div>
                    <div>
                        <label for="">Tên sản phẩm</label>
                        <input type="text" id="productName">
                    </div>
                    <div>
                        <label for="">Số lượng</label>
                        <input type="text" id="quanity">
                    </div>
                    <div>
                        <label for="">Đơn giá</label>
                        <input type="text" id="price">
                    </div>
                    <div>
                        <label for="">Thành tiền</label>
                        <input type="text" id="totalPrice">
                    </div>
                    <button type="button" class="btn-delete-product">xóa</button>
                </div>`
    })
}


