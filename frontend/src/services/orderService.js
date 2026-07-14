import BASE_URL, { request } from "./api";

const API_URL = `${BASE_URL}/orders`;

export async function getOrders() {
    return request(API_URL);
}

export async function getOrder(id) {
    return request(`${API_URL}/${id}`);
}

export async function createOrder(order) {
    return request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });
}

export async function updateOrder(id, order) {
    const payload = { ...order, orderId: id };
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

export async function deleteOrder(id) {
    return request(`${API_URL}/${id}`, { method: "DELETE" });
}