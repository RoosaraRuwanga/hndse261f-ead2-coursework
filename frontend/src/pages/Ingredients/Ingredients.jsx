import { useEffect, useState } from "react";
import { getAllIngredients, createIngredient, updateIngredient, deleteIngredient } from "../../services/ingredientService";
const LOW_STOCK_THRESHOLD = 20;

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ ingredientId: null, name: "", quantity: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadIngredients();
    }, []);

    async function loadIngredients() {
        const data = await getAllIngredients();
        setIngredients(data);
    }

    function getStatus(quantity) {
        if (quantity <= 0) return { label: "Needs Restock", color: "#e63946" };
        if (quantity < LOW_STOCK_THRESHOLD) return { label: "Low", color: "#f4a261" };
        return { label: "Good", color: "#2d6a4f" };
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function openAddForm() {
        setForm({ ingredientId: null, name: "", quantity: "" });
        setEditing(false);
        setShowForm(true);
    }

    function openEditForm() {
        const selected = ingredients.find((i) => i.ingredientId === selectedId);
        if (!selected) return;
        setForm(selected);
        setEditing(true);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setForm({ ingredientId: null, name: "", quantity: "" });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { ...form, quantity: parseInt(form.quantity) };

        if (editing) {
            await updateIngredient(payload.ingredientId, payload);
        } else {
            delete payload.ingredientId;
            await createIngredient(payload);
        }

        closeForm();
        setSelectedId(null);
        loadIngredients();
    }

    async function handleDelete(id) {
        await deleteIngredient(id);
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
                                const isSelected = selectedId === ing.ingredientId;
                                return (
                                    <tr
                                        key={ing.ingredientId}
                                        onClick={() => setSelectedId(ing.ingredientId)}
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
                                                    handleDelete(ing.ingredientId);
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