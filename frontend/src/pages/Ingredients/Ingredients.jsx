import { useEffect, useState } from "react";
import { getAllIngredients } from "../../services/ingredientService";

const API_URL = "http://localhost:8080/ingredient-service/api/ingredients";

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [form, setForm] = useState({ ingredient_id: null, name: "", quantity: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadIngredients();
    }, []);

    async function loadIngredients() {
        const data = await getAllIngredients();
        setIngredients(data);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { ...form, quantity: parseInt(form.quantity) };

        if (editing) {
            await fetch(API_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            delete payload.ingredient_id;
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }

        resetForm();
        loadIngredients();
    }

    function handleEdit(ingredient) {
        setForm(ingredient);
        setEditing(true);
    }

    async function handleDelete(id) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadIngredients();
    }

    function resetForm() {
        setForm({ ingredient_id: null, name: "", quantity: "" });
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
            <div style={{ padding: "40px", maxWidth: "700px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Ingredients</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Manage ingredient stock
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
                        {editing ? "Edit Ingredient" : "Add Ingredient"}
                    </h2>
                    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <button type="submit">{editing ? "Update" : "Add"} Ingredient</button>
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
                                <th style={{ textAlign: "left", padding: "10px" }}>Ingredient ID</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Quantity</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((ing) => (
                                <tr key={ing.ingredient_id} style={{ borderBottom: "1px solid #333" }}>
                                    <td style={{ padding: "10px" }}>{ing.ingredient_id}</td>
                                    <td style={{ padding: "10px" }}>{ing.name}</td>
                                    <td style={{ padding: "10px" }}>{ing.quantity}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button onClick={() => handleEdit(ing)}>Edit</button>
                                        <button
                                            onClick={() => handleDelete(ing.ingredient_id)}
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