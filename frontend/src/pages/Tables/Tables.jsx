import { useEffect, useState } from "react";
import { getTables, assignEmployeeToTable, releaseEmployeeFromTable } from "../../services/tableService";
import { getEmployees } from "../../services/employeeService";

export default function Tables() {
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});

    useEffect(() => {
        loadTables();
        loadEmployees();
    }, []);

    async function loadTables() {
        const data = await getTables();
        setTables(data);
    }

    async function loadEmployees() {
        const data = await getEmployees();
        setEmployees(data);
    }

    function getEmployeeName(id) {
        const emp = employees.find((e) => e.emp_id === id);
        return emp ? emp.name : "Unassigned";
    }

    async function handleAssign(tableId) {
        const employeeId = selectedEmployee[tableId];
        if (!employeeId) return;
        await assignEmployeeToTable(tableId, employeeId);
        loadTables();
    }

    async function handleRelease(tableId) {
        await releaseEmployeeFromTable(tableId);
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
                        <th>Actions</th>
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
                                <button onClick={() => handleAssign(table.table_id)}>Assign</button>
                                <button onClick={() => handleRelease(table.table_id)}>Release</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}