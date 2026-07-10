import '../../App.css';
import { useEffect, useState } from "react";
import { getEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee 
} from "../../services/employeeService";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        emp_id: null,
        password: "",
        name: "",
        age: "",
        role: "",
        emp_status: "Available",
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

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            age: parseInt(form.age),
            salary: parseFloat(form.salary)
        };

        if (editing) {
            await updateEmployee(payload);
        } else {
            delete payload.emp_id;
            await createEmployee(payload);
        }
        
        reserForm();
        loadEmployees();
    }

    function handleEdit(employee) {
        setForm(employee);
        setEditing(true);
    }

    async function handleDelete(id) {
        await deleteEmployee(id);
        loadEmployees();
    }

    function reserForm() {
        setForm({
            emp_id: null,
            password: "",
            name: "",
            age: "",
            role: "",
            emp_status: "Available",
            salary: ""
        });
        setEditing(false);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Employees</h1>
            <form onSubmit={handleSubmit}>
                <input name = "name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input name = "password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <input name = "age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
                <input name = "role" placeholder="Role" value={form.role} onChange={handleChange} required />
                <input name = "salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} required />
                <select name="emp_status" value={form.emp_status} onChange={handleChange} required>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                <button type="submit">{editing ? "Update" : "Add"} Employee</button>
                {editing && <button type="button" onClick={reserForm}>Cancel</button>}
            </form>

            <table boarder ="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.emp_id}>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.role}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.emp_status}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee.emp_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}