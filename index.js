const orderList = document.getElementById('orders');
let storedApi = localStorage.getItem('crudCrudEndpoint');

async function fetchOrders() {
    try {
        const response = await axios.get(`${storedApi}/orders`);
        response.data.forEach(displayOrderDetails);
    } catch (error) {
        console.error(error);
    }
}

async function onPlaceOrder(event) {
    event.preventDefault();

    const food = document.getElementById('food').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const totalAmount = document.getElementById('totalAmount').value;

    const orderData = {
        food: food,
        tableNumber: tableNumber,
        totalAmount: totalAmount,
    };

    try {
        const response = await axios.post(`${storedApi}/orders`, orderData);

        console.log(response);

        await fetchOrders();

        document.getElementById('food').value = '';
        document.getElementById('tableNumber').value = '';
        document.getElementById('totalAmount').value = '';
    } catch (error) {
        console.error(error);
    }
}

async function removeOrder(li, orderData) {
    try {
        const response = await axios.delete(`${storedApi}/orders/${orderData._id}`);
        
        console.log(response);

        li.remove();
    } catch (error) {
        console.error(error);
    }
}

function displayOrderDetails(orderData) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<strong>Food Item:</strong> ${orderData.food}<br>
                    <strong>Table Number:</strong> ${orderData.tableNumber}<br>
                    <strong>Total Amount:</strong> ${orderData.totalAmount}`;

    const delBtn = createButton('Delete', 'btn-danger', removeOrder.bind(null, li, orderData));
    li.appendChild(delBtn);
    orderList.appendChild(li);
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.className = `btn ${className} btn-sm float-right me-2`;
    button.appendChild(document.createTextNode(text));
    button.addEventListener('click', clickHandler);
    return button;
}

window.addEventListener("DOMContentLoaded", fetchOrders);

async function updateApi(event) {
    event.preventDefault();

    const newApi = document.getElementById('api').value.trim();

    try {
        if (newApi !== '') {
            localStorage.setItem('crudCrudEndpoint', newApi);
            storedApi = newApi;
            await fetchOrders();
        }
    } catch (error) {
        console.error(error);
    }
}
