const orderList = document.getElementById('orders');

async function fetchOrders() {
    try {
        const response = await axios.get('https://crudcrud.com/api/a2f5f458310d45bcb40005902d000419/orders');
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
        const response = await axios.post("https://crudcrud.com/api/a2f5f458310d45bcb40005902d000419/orders", orderData);

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
        const response = await axios.delete(`https://crudcrud.com/api/a2f5f458310d45bcb40005902d000419/orders/${orderData._id}`);
        
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
