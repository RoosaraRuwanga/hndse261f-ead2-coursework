const API_URL = process.env.REACT_APP_TABLE_API_URL || "http://localhost:8083/table-service/api/tables";

async function handleResponse(response, actionLabel) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `${actionLabel} failed (status ${response.status})`);
    }
    return response.json();
}

export async function getTables() {
    const response = await fetch(API_URL);
    return handleResponse(response, "Failed to load tables");
}

export async function getTable(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response, "Failed to load table");
}

export async function assignEmployeeToTable(id, employeeId) {
    const response = await fetch(`${API_URL}/${id}/assignEmployee/${employeeId}`, {
        method: "PUT"
    });
    return handleResponse(response, "Failed to assign employee");
}

export async function releaseEmployeeFromTable(id) {
    const response = await fetch(`${API_URL}/${id}/releaseEmployee`, {
        method: "PUT"
    });
    return handleResponse(response, "Failed to release employee");
}

export async function assignOrderToTable(id, orderId) {
    const response = await fetch(`${API_URL}/${id}/assign/${orderId}`, {
        method: "PUT"
    });
    return handleResponse(response, "Failed to assign order");
}

export async function releaseOrderFromTable(id) {
    const response = await fetch(`${API_URL}/${id}/release`, {
        method: "PUT"
    });
    return handleResponse(response, "Failed to release order");
}