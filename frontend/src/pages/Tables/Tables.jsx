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

    useEffect(() => {
        loadTables();
        loadEmployees();
        loadOrders();
    }, []);

    async function loadTables() {
        const data = await getTables();
        setTables(data);
    }

    async function loadEmployees() {
        const data = await getEmployees();
        setEmployees(data);
    }

    async function loadOrders() {
        const data = await getOrders();
        setOrders(data);
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
        await assignEmployeeToTable(tableId, employeeId);
        loadTables();
    }

    async function handleReleaseEmployee(tableId) {
        await releaseEmployeeFromTable(tableId);
        loadTables();
    }

    async function handleAssignOrder(tableId) {
        const orderId = selectedOrder[tableId];
        if (!orderId) return;
        await assignOrderToTable(tableId, orderId);
        loadTables();
    }

    async function handleReleaseOrder(tableId) {
        await releaseOrderFromTable(tableId);
        loadTables();
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Tables</h1>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Table ID</th>
                        <th>Status</th>
                        <th>Assigned Employee</th>
                        <th>Employee Actions</th>
                        <th>Assigned Order</th>
                        <th>Order Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table) => (
                        <tr key={table.table_id}>
                            <td>{table.table_id}</td>
                            <td>{table.table_status}</td>
                            <td>{getEmployeeName(table.assigned_employee_id)}</td>
                            <td>
                                <select
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
                                            {emp.name}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleAssignEmployee(table.table_id)}>Assign</button>
                                <button onClick={() => handleReleaseEmployee(table.table_id)}>Release</button>
                            </td>
                            <td>{getOrderLabel(table.assigned_order_id)}</td>
                            <td>
                                <select
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
                                <button onClick={() => handleReleaseOrder(table.table_id)}>Release</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}