import { useEffect, useState } from "react";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employeeId: null,
        password: "",
        name: "",
        age: "",
        role: "",
        status: "Available",
        salary: ""
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {
        const data = await getEmployees();
        setEmployees(data);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            age: parseInt(form.age),
            salary: parseFloat(form.salary)
        };

        if (editing) {
            await updateEmployee(payload.employeeId, payload);
        } else {
            delete payload.employeeId;
            await createEmployee(payload);
        }

        resetForm();
        loadEmployees();
    }

    function handleEdit(emp) {
        setForm(emp);
        setEditing(true);
    }

    async function handleDelete(id) {
        await deleteEmployee(id);
        loadEmployees();
    }

    function resetForm() {
        setForm({
            employeeId: null,
            password: "",
            name: "",
            age: "",
            role: "",
            status: "Available",
            salary: ""
        });
        setEditing(false);
    }

    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #444",
        backgroundColor: "#1f1414",
        color: "white"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "900px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Employees</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Manage staff accounts
                </p>

                <div
                    style={{
                        backgroundColor: "#2a1a1a",
                        borderRadius: "10px",
                        padding: "24px",
                        marginBottom: "24px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                    }}
                >
                    <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
                        {editing ? "Edit Employee" : "Add Employee"}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}
                    >
                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={inputStyle} />
                        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle} />
                        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required style={{ ...inputStyle, width: "70px" }} />
                        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required style={inputStyle} />
                        <input name="salary" type="number" step="0.01" placeholder="Salary" value={form.salary} onChange={handleChange} required style={inputStyle} />
                        <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                            <option value="Available">Available</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        <button type="submit">{editing ? "Update" : "Add"} Employee</button>
                        {editing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                style={{ backgroundImage: "none", backgroundColor: "#444" }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                <div
                    style={{
                        backgroundColor: "#2a1a1a",
                        borderRadius: "10px",
                        padding: "24px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #444" }}>
                                <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Age</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Role</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Salary</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employeeId} style={{ borderBottom: "1px solid #333" }}>
                                    <td style={{ padding: "10px" }}>{emp.name}</td>
                                    <td style={{ padding: "10px" }}>{emp.age}</td>
                                    <td style={{ padding: "10px" }}>{emp.role}</td>
                                    <td style={{ padding: "10px" }}>{emp.salary}</td>
                                    <td style={{ padding: "10px" }}>{emp.status}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button onClick={() => handleEdit(emp)}>Edit</button>
                                        <button
                                            onClick={() => handleDelete(emp.employeeId)}
                                            style={{ marginLeft: "6px", backgroundColor: "#444", backgroundImage: "none" }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}