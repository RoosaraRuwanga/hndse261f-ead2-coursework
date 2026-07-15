// itemService.js
const API_URL = process.env.REACT_APP_ITEM_API_URL || "http://localhost:8084/item-service/api/items";

export async function getItem(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function getAllItems() {
    const response = await fetch(API_URL);
    return response.json();
}