import { useEffect, useState } from "react";
import { getAllIngredients } from "../../services/ingredientService";

const API_URL = "http://localhost:8080/ingredient-service/api/ingredients";
const LOW_STOCK_THRESHOLD = 20;

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ ingredient_id: null, name: "", quantity: "" });
    const [editing, setEditing] = useState(false);

    const LOW_STOCK_THRESHOLD = 20;
    const CRITICAL_STOCK_THRESHOLD = 5;
    
    useEffect(() => {
        loadIngredients();
    }, []);

    async function loadIngredients() {
        const data = await getAllIngredients();
        setIngredients(data);
    }

    function getStatus(quantity) {
        if (quantity <= 0) return { label: "⚠ Out of Stock", color: "#e63946" };
        if (quantity <= CRITICAL_STOCK_THRESHOLD) return { label: "⚠ Critical - Reorder Now", color: "#d62828" };
        if (quantity < LOW_STOCK_THRESHOLD) return { label: "Low Stock", color: "#f4a261" };
        return { label: "Good", color: "#2d6a4f" };
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function openAddForm() {
        setForm({ ingredient_id: null, name: "", quantity: "" });
        setEditing(false);
        setShowForm(true);
    }

    function openEditForm() {
        const selected = ingredients.find((i) => i.ingredient_id === selectedId);
        if (!selected) return;
        setForm(selected);
        setEditing(true);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setForm({ ingredient_id: null, name: "", quantity: "" });
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

        closeForm();
        setSelectedId(null);
        loadIngredients();
    }

    async function handleDelete(id) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (selectedId === id) setSelectedId(null);
        loadIngredients();
    }

    const filteredIngredients = ingredients.filter((ing) =>
        ing.name.toLowerCase().includes(search.toLowerCase())
    );

    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #444",
        backgroundColor: "#1f1414",
        color: "white",
        boxSizing: "border-box"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "800px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Ingredients</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Manage ingredient stock
                </p>

                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <input
                        placeholder="Search ingredients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                    />
                    <button onClick={openAddForm}>Add Ingredient</button>
                    <button
                        onClick={openEditForm}
                        disabled={!selectedId}
                        style={{
                            opacity: selectedId ? 1 : 0.5,
                            cursor: selectedId ? "pointer" : "not-allowed"
                        }}
                    >
                        Edit
                    </button>
                </div>

                {showForm && (
                    <div
                        style={{
                            backgroundColor: "#2a1a1a",
                            borderRadius: "10px",
                            padding: "24px",
                            marginBottom: "20px",
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
                            <button type="submit">{editing ? "Update" : "Add"}</button>
                            <button
                                type="button"
                                onClick={closeForm}
                                style={{ backgroundImage: "none", backgroundColor: "#444" }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

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
                                <th style={{ textAlign: "left", padding: "10px" }}>Quantity</th>
                                <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
                                <th style={{ textAlign: "left", padding: "10px" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIngredients.map((ing) => {
                                const status = getStatus(ing.quantity);
                                const isSelected = selectedId === ing.ingredient_id;
                                return (
                                    <tr
                                        key={ing.ingredient_id}
                                        onClick={() => setSelectedId(ing.ingredient_id)}
                                        style={{
                                            borderBottom: "1px solid #333",
                                            cursor: "pointer",
                                            backgroundColor: isSelected ? "#3a2222" : "transparent"
                                        }}
                                    >
                                        <td style={{ padding: "10px" }}>{ing.name}</td>
                                        <td style={{ padding: "10px" }}>{ing.quantity}</td>
                                        <td style={{ padding: "10px" }}>
                                            <span
                                                style={{
                                                    padding: "3px 10px",
                                                    borderRadius: "12px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    backgroundColor: status.color
                                                }}
                                            >
                                                {status.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: "10px", textAlign: "right" }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(ing.ingredient_id);
                                                }}
                                                style={{
                                                    backgroundColor: "#444",
                                                    backgroundImage: "none",
                                                    padding: "6px 12px",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}