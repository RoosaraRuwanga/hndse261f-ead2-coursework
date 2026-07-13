const API_URL = "https://YOUR-EMPLOYEE-SERVICE.onrender.com/employee-service/api/employees";

export async function getItem(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function getAllItems() {
    const response = await fetch(API_URL);
    return response.json();
}