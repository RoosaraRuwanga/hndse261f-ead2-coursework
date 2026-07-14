import BASE_URL, { request } from "./api";

const API_URL = `${BASE_URL}/ingredients`;

export async function getIngredient(id) {
    return request(`${API_URL}/${id}`);
}

export async function getAllIngredients() {
    return request(API_URL);
}

export async function createIngredient(ingredient) {
    return request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredient)
    });
}

export async function updateIngredient(id, ingredient) {
    const payload = { ...ingredient, ingredientId: id };
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

export async function deleteIngredient(id) {
    return request(`${API_URL}/${id}`, { method: "DELETE" });
}