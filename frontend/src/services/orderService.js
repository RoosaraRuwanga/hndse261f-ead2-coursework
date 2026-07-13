const API_URL = "https://YOUR-EMPLOYEE-SERVICE.onrender.com/employee-service/api/employees";

export async function getOrders() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getOrder(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}