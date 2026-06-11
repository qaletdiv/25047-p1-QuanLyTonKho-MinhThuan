let maxID = null;
let idPro = null;
let edit = false;

async function getSupplier() {
    const response = await fetch('http://localhost:3000/suppliers');

    if (!response.ok) {
        throw new Error('Lỗi server');
    }

    const suppliers = await response.json();

    renderSuppliers(suppliers);
}
getSupplier()
function renderSuppliers(suppliers) {
    tbody.innerHTML = '';

    suppliers.forEach((supplier, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${supplier.name}</td>
                <td><img src="${supplier.logo}" alt="${supplier.name}" width="80"></td>
                <td>${supplier.email}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.address}</td>
                <td>
                    <button onClick="editSupplier('${supplier.id}')">Sửa</button>
                    <button onClick="deleteSupplier('${supplier.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
}


const formsupplier = document.querySelector('#formsupplier');
const addBtn2 = document.getElementById('btn-sup');

if (addBtn2 && formsupplier) {
    addBtn2.addEventListener('click', function () {
        if (formsupplier.style.display === 'block') {
            formsupplier.style.display = 'none';
        } else {
            formsupplier.style.display = 'block';
        }
    });
}


formsupplier.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const logo = document.getElementById('image').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;


    const newSupply = {
        name,
        logo,
        email,
        phone,
        address
    };
    if (edit) {
        fetch(`http://localhost:3000/suppliers/${idPro}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSupply)
        });
    } else {
        fetch("http://localhost:3000/suppliers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSupply)
        });
    }

});


function deleteSupplier(id) {
    fetch(`http://localhost:3000/suppliers/${id}`, {
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