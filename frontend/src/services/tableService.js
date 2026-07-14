import BASE_URL, { request } from "./api";

const API_URL = `${BASE_URL}/tables`;

export async function getTables() {
    return request(API_URL);
}

export async function getTable(id) {
    return request(`${API_URL}/${id}`);
}

export async function createTable(table) {
    return request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(table)
    });
}

export async function updateTable(id, table) {
    const payload = { ...table, tableId: id };
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

export async function deleteTable(id) {
    return request(`${API_URL}/${id}`, { method: "DELETE" });
}