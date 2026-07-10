const API_URL = "http://localhost:8082/order-service/api/orders";

export async function getOrders() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getOrder(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}