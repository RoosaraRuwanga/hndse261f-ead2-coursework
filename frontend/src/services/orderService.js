const API_URL =
  "https://YOUR-BACKEND-URL/order-service/api/orders";

export async function getOrders() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getOrder(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}