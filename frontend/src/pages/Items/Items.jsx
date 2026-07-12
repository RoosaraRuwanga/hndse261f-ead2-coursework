import { useEffect, useState } from "react";
import { getAllItems } from "../../services/itemService";
import { getIngredient, getAllIngredients } from "../../services/ingredientService";

const API_URL = "http://localhost:8084/item-service/api/items";

export default function Items() {
    const [items, setItems] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [ingredientNames, setIngredientNames] = useState({});
    const [search, setSearch] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => {
        loadItems();
        loadAllIngredients();
    }, []);

    async function loadItems() {
        const data = await getAllItems();
        setItems(data);

        const namesMap = {};
        for (const item of data) {
            if (item.ingredient1_id) {
                const ing1 = await getIngredient(item.ingredient1_id);
                namesMap[item.ingredient1_id] = ing1.name;
            }
            if (item.ingredient2_id) {
                const ing2 = await getIngredient(item.ingredient2_id);
                namesMap[item.ingredient2_id] = ing2.name;
            }
        }
        setIngredientNames(namesMap);
    }

    async function loadAllIngredients() {
        const data = await getAllIngredients();
        setAllIngredients(data);
    }

    function openEdit(item) {
        setEditingItem(item);
        setForm(item);
    }

    function closeEdit() {
        setEditingItem(null);
        setForm({});
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        const payload = {
            ...form,
            price: parseFloat(form.price),
            ingredient1_id: parseInt(form.ingredient1_id),
            ingredient1_amt: parseInt(form.ingredient1_amt),
            ingredient2_id: parseInt(form.ingredient2_id),
            ingredient2_amt: parseInt(form.ingredient2_amt)
        };

        await fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        closeEdit();
        loadItems();
    }

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #444",
        backgroundColor: "#1f1414",
        color: "white",
        width: "100%",
        boxSizing: "border-box"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: "24px", padding: "40px", maxWidth: "1100px", width: "100%" }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{ marginBottom: "4px" }}>Items</h1>
                    <p style={{ color: "#bbb", marginBottom: "20px" }}>
                        {filteredItems.length} of {items.length} items
                    </p>

                    <input
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ ...inputStyle, marginBottom: "20px" }}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {filteredItems.map((item) => (
                            <div
                                key={item.item_id}
                                style={{
                                    backgroundColor: "#2a1a1a",
                                    borderRadius: "8px",
                                    padding: "14px 18px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: "bold" }}>{item.name}</div>
                                    <div style={{ fontSize: "13px", color: "#aaa" }}>
                                        {ingredientNames[item.ingredient1_id] || "—"} (x{item.ingredient1_amt}),{" "}
                                        {ingredientNames[item.ingredient2_id] || "—"} (x{item.ingredient2_amt})
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <span style={{ fontWeight: "bold" }}>Rs. {item.price.toFixed(2)}</span>
                                    <button onClick={() => openEdit(item)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {editingItem && (
                    <div
                        style={{
                            width: "320px",
                            backgroundColor: "#2a1a1a",
                            borderRadius: "10px",
                            padding: "24px",
                            height: "fit-content",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <h2 style={{ margin: 0, fontSize: "18px" }}>Edit Item</h2>
                            <span style={{ cursor: "pointer", color: "#aaa" }} onClick={closeEdit}>✕</span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Name</label>
                                <input name="name" value={form.name || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Price (Rs.)</label>
                                <input name="price" type="number" step="0.01" value={form.price || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Ingredient 1</label>
                                <select name="ingredient1_id" value={form.ingredient1_id || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }}>
                                    <option value="">Select ingredient</option>
                                    {allIngredients.map((ing) => (
                                        <option key={ing.ingredient_id} value={ing.ingredient_id}>
                                            {ing.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Ingredient 1 Amount</label>
                                <input name="ingredient1_amt" type="number" value={form.ingredient1_amt || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Ingredient 2</label>
                                <select name="ingredient2_id" value={form.ingredient2_id || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }}>
                                    <option value="">Select ingredient</option>
                                    {allIngredients.map((ing) => (
                                        <option key={ing.ingredient_id} value={ing.ingredient_id}>
                                            {ing.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#bbb" }}>Ingredient 2 Amount</label>
                                <input name="ingredient2_amt" type="number" value={form.ingredient2_amt || ""} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <button onClick={handleSave} style={{ flex: 1 }}>Save Item</button>
                            <button
                                onClick={closeEdit}
                                style={{ flex: 1, backgroundColor: "#444", backgroundImage: "none" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}