import { useEffect, useState } from "react";
import {
    getTables,
    assignEmployeeToTable,
    releaseEmployeeFromTable,
    assignOrderToTable,
    releaseOrderFromTable
} from "../../services/tableService";
import { getEmployees } from "../../services/employeeService";
import { getOrders } from "../../services/orderService";

export default function Tables() {
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [selectedOrder, setSelectedOrder] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTables();
        loadEmployees();
        loadOrders();
    }, []);

    async function loadTables() {
        try {
            const data = await getTables();
            setTables(data);
        } catch (err) {
            console.error("Failed to load tables:", err);
        }
    }

    async function loadEmployees() {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (err) {
            console.error("Failed to load employees:", err);
        }
    }

    async function loadOrders() {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error("Failed to load orders:", err);
        }
    }

    function getEmployeeName(id) {
        const emp = employees.find((e) => e.emp_id === id);
        return emp ? emp.name : "Unassigned";
    }

    function getOrderLabel(id) {
        const order = orders.find((o) => o.id === id);
        return order ? `Order #${order.id} (${order.status})` : "No order";
    }

    async function handleAssignEmployee(tableId) {
        const employeeId = selectedEmployee[tableId];
        if (!employeeId) return;

        setError(null);
        try {
            await assignEmployeeToTable(tableId, employeeId);
            await loadTables();
            await loadEmployees();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleReleaseEmployee(tableId) {
        setError(null);
        try {
            await releaseEmployeeFromTable(tableId);
            await loadTables();
            await loadEmployees();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleAssignOrder(tableId) {
        const orderId = selectedOrder[tableId];
        if (!orderId) return;

        setError(null);
        try {
            await assignOrderToTable(tableId, orderId);
            await loadTables();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleReleaseOrder(tableId) {
        setError(null);
        try {
            await releaseOrderFromTable(tableId);
            await loadTables();
        } catch (err) {
            setError(err.message);
        }
    }

    const inputStyle = {
        padding: "6px",
        borderRadius: "5px",
        border: "1px solid #444",
        backgroundColor: "#1f1414",
        color: "white"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "1100px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Tables</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Assign employees and orders to tables
                </p>

                {error && (
                    <div
                        style={{
                            backgroundColor: "#4a1a1a",
                            border: "1px solid #e63946",
                            borderRadius: "6px",
                            padding: "12px 16px",
                            marginBottom: "20px",
                            color: "#ffb3b3"
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {tables.map((table) => (
                        <div
                            key={table.table_id}
                            style={{
                                backgroundColor: "#2a1a1a",
                                borderRadius: "10px",
                                padding: "20px",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "16px"
                                }}
                            >
                                <h2 style={{ margin: 0 }}>Table {table.table_id}</h2>
                                <span
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: "12px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        backgroundColor: table.table_status === "Free" ? "#2d6a4f" : "#e63946"
                                    }}
                                >
                                    {table.table_status}
                                </span>
                            </div>

                            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                                <div>
                                    <p style={{ marginBottom: "6px", color: "#bbb", fontSize: "14px" }}>
                                        Employee: <strong style={{ color: "white" }}>{getEmployeeName(table.assigned_employee_id)}</strong>
                                    </p>
                                    <div style={{ display: "flex", gap: "6px" }}>
                                        <select
                                            style={inputStyle}
                                            value={selectedEmployee[table.table_id] || ""}
                                            onChange={(e) =>
                                                setSelectedEmployee({
                                                    ...selectedEmployee,
                                                    [table.table_id]: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">Select employee</option>
                                            {employees.map((emp) => (
                                                <option key={emp.emp_id} value={emp.emp_id}>
                                                    {emp.name} {emp.emp_status ? `(${emp.emp_status})` : ""}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleAssignEmployee(table.table_id)}>Assign</button>
                                        <button
                                            onClick={() => handleReleaseEmployee(table.table_id)}
                                            style={{ backgroundColor: "#444", backgroundImage: "none" }}
                                        >
                                            Release
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p style={{ marginBottom: "6px", color: "#bbb", fontSize: "14px" }}>
                                        Order: <strong style={{ color: "white" }}>{getOrderLabel(table.assigned_order_id)}</strong>
                                    </p>
                                    <div style={{ display: "flex", gap: "6px" }}>
                                        <select
                                            style={inputStyle}
                                            value={selectedOrder[table.table_id] || ""}
                                            onChange={(e) =>
                                                setSelectedOrder({
                                                    ...selectedOrder,
                                                    [table.table_id]: e.target.value
                                                })
                                            }
                                        >
                                            <option value="">Select order</option>
                                            {orders.map((order) => (
                                                <option key={order.id} value={order.id}>
                                                    Order #{order.id} ({order.status})
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleAssignOrder(table.table_id)}>Assign</button>
                                        <button
                                            onClick={() => handleReleaseOrder(table.table_id)}
                                            style={{ backgroundColor: "#444", backgroundImage: "none" }}
                                        >
                                            Release
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}