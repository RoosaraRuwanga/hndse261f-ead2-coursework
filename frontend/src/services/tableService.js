// tableService.js
const API_URL = process.env.REACT_APP_TABLE_API_URL || "http://localhost:8083/table-service/api/tables";
    
export async function getTables() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getTable(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function assignEmployeeToTable(id, employeeId) {
    const response = await fetch(`${API_URL}/${id}/assignEmployee/${employeeId}`, {
        method: "PUT"
    });
    return response.json();
}

export async function releaseEmployeeFromTable(id) {
    const response = await fetch(`${API_URL}/${id}/releaseEmployee`, {
        method: "PUT"
    });
    return response.json();
}

export async function assignOrderToTable(id, orderId) {
    const response = await fetch(`${API_URL}/${id}/assign/${orderId}`, {
        method: "PUT"
    });
    return response.json();
}

export async function releaseOrderFromTable(id) {
    const response = await fetch(`${API_URL}/${id}/release`, {
        method: "PUT"
    });
    return response.json();
}