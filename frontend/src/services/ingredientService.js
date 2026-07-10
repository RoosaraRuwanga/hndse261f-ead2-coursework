const API_URL = "http://localhost:8080/ingredient-service/api/ingredients";

export async function getIngredient(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function getAllIngredients() {
    const response = await fetch(API_URL);
    return response.json();
}