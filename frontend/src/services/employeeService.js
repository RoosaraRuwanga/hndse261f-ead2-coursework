// employeeService.js
const API_URL = process.env.REACT_APP_EMPLOYEE_API_URL || "http://localhost:8081/employee-service/api/employees";


export async function getEmployees() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getEmployee(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function createEmployee(employee) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    return response.json();
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    return response.json();
}

export async function getAvailableEmployees() {
    const response = await fetch(`${API_URL}/available`);
    return response.json();
}

export async function updateEmployee(employee) {
    const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    return response.json();
}

export async function assignEmployeeToOrder(employeeId, orderId) {
    const response = await fetch(`${API_URL}/${employeeId}/assign/${orderId}`, {
        method: "PUT"
    });
    return response.json();
}

export async function releaseEmployeeFromOrder(employeeId, orderId) {
    const response = await fetch(`${API_URL}/${employeeId}/release/${orderId}`, {
        method: "PUT"
    });
    return response.json();
}

export async function loginEmployee(name, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
    });
    if (!response.ok) return null;
    return response.json();
}