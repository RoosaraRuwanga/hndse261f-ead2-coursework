import BASE_URL, { request } from "./api";

const API_URL = `${BASE_URL}/employees`;

export async function getEmployees() {
    return request(API_URL);
}

export async function getEmployee(id) {
    return request(`${API_URL}/${id}`);
}

export async function createEmployee(employee) {
    return request(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
}

export async function updateEmployee(id, employee) {
    const payload = { ...employee, employeeId: id };
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
}

export async function deleteEmployee(id) {
    return request(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}