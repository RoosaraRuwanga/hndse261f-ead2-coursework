import BASE_URL, { request } from "./api";

const API_URL = `${BASE_URL}/items`;

export async function getItem(id) {
    return request(`${API_URL}/${id}`);
}

export async function getAllItems() {
    return request(API_URL);
}

export async function createItem(item) {
    console.log("POST /items payload:", JSON.stringify(item, null, 2));
    return request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
}

export async function updateItem(id, item) {
    console.log(`PUT /items/${id} payload:`, JSON.stringify(item, null, 2));
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
}

export async function deleteItem(id) {
    return request(`${API_URL}/${id}`, { method: "DELETE" });
}