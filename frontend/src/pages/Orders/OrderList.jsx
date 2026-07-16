import { useEffect, useState } from "react";
import { getAllItems } from "../../services/itemService";

const ORDER_SERVICE_URL = "http://localhost:8082/order-service/api/orders";

// Fixed display order for categories. Anything that doesn't match a
// keyword below falls into "Other" at the end.
const CATEGORY_ORDER = ["Pizza", "Sides", "Drinks", "Desserts", "Other"];

// Frontend-only categorization: no `category` field exists in the backend,
// so we infer it from the item name. Keywords are checked in order, so
// put more specific words first if you add new ones. Case-insensitive.
const CATEGORY_KEYWORDS = {
    Pizza: ["pizza"],
    Drinks: ["cola", "soda", "tea", "juice", "lemonade", "lime soda", "coffee"],
    Desserts: ["cake", "tiramisu", "ice cream", "brownie", "pudding", "pie"],
    Sides: ["fries", "rings", "wings", "bread", "breadsticks", "nuggets", "salad"]
};

function inferCategory(itemName) {
    const nameLower = itemName.toLowerCase();

    for (const category of Object.keys(CATEGORY_KEYWORDS)) {
        const keywords = CATEGORY_KEYWORDS[category];
        const matches = keywords.some((kw) => {
            // Word-boundary match instead of plain substring match, so
            // "cola" doesn't false-positive inside "chocolate", etc.
            const pattern = new RegExp(`\\b${kw}\\b`, "i");
            return pattern.test(nameLower);
        });
        if (matches) {
            return category;
        }
    }

    return "Other";
}

export default function OrderList() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderError, setOrderError] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        try {
            const data = await getAllItems();
            setItems(data);
        } catch (err) {
            console.error("Failed to load items:", err);
        }
    }

    function toggleItem(itemId) {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    }

    function calculateRunningTotal() {
        return selectedItems.reduce((sum, itemId) => {
            const item = items.find((i) => i.item_id === itemId);
            return sum + (item ? item.price : 0);
        }, 0);
    }

    function getSelectedItemDetails() {
        return selectedItems
            .map((id) => items.find((i) => i.item_id === id))
            .filter(Boolean);
    }

    // Groups items into { "Pizza": [...], "Sides": [...], ... } and returns
    // them in CATEGORY_ORDER, skipping empty categories.
    function getGroupedItems() {
        const groups = {};

        for (const item of items) {
            const category = inferCategory(item.name);
            if (!groups[category]) groups[category] = [];
            groups[category].push(item);
        }

        return CATEGORY_ORDER
            .filter((cat) => groups[cat] && groups[cat].length > 0)
            .map((cat) => ({ category: cat, items: groups[cat] }));
    }

    async function confirmOrder() {
        setIsSubmitting(true);
        setOrderError(null);

        try {
            const createRes = await fetch(ORDER_SERVICE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "Pending",
                    items: [],
                    total_price: 0
                })
            });

            if (!createRes.ok) {
                throw new Error(`Failed to create order: ${createRes.status}`);
            }

            const order = await createRes.json();

            const failedItems = [];

            for (const itemId of selectedItems) {
                const addRes = await fetch(`${ORDER_SERVICE_URL}/${order.id}/items`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(itemId)
                });

                if (!addRes.ok) {
                    const itemName =
                        items.find((i) => i.item_id === itemId)?.name || `Item #${itemId}`;
                    failedItems.push(itemName);
                }
            }

            if (failedItems.length > 0) {
                setOrderError(
                    `Order placed, but these items couldn't be added (likely insufficient stock): ${failedItems.join(", ")}`
                );
            }

            setSelectedItems([]);
            setShowConfirm(false);
        } catch (err) {
            console.error("Failed to confirm order:", err);
            setOrderError("Something went wrong while placing the order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const groupedItems = getGroupedItems();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "700px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Order List</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Select items
                </p>

                {orderError && (
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
                        {orderError}
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
                    {groupedItems.map(({ category, items: categoryItems }) => (
                        <div key={category} style={{ marginBottom: "24px" }}>
                            <h2
                                style={{
                                    marginTop: 0,
                                    marginBottom: "12px",
                                    fontSize: "16px",
                                    color: "#e63946",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                {category}
                            </h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {categoryItems.map((item) => {
                                    const isSelected = selectedItems.includes(item.item_id);
                                    return (
                                        <label
                                            key={item.item_id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "12px 16px",
                                                borderRadius: "6px",
                                                backgroundColor: isSelected ? "#e63946" : "#1f1414",
                                                border: "1px solid #444",
                                                cursor: "pointer",
                                                transition: "background-color 0.15s ease"
                                            }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleItem(item.item_id)}
                                                />
                                                {item.name}
                                            </span>
                                            <span style={{ fontWeight: "bold" }}>
                                                Rs. {item.price.toFixed(2)}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "24px",
                            paddingTop: "16px",
                            borderTop: "1px solid #444"
                        }}
                    >
                        <span style={{ fontSize: "18px" }}>
                            <strong>Running Total:</strong> Rs. {calculateRunningTotal().toFixed(2)}
                        </span>
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={selectedItems.length === 0}
                            style={{
                                opacity: selectedItems.length === 0 ? 0.5 : 1,
                                cursor: selectedItems.length === 0 ? "not-allowed" : "pointer"
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>

                {showConfirm && (
                    <div
                        style={{
                            backgroundColor: "#2a1a1a",
                            borderRadius: "10px",
                            padding: "24px",
                            marginTop: "24px",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                        }}
                    >
                        <h2 style={{ marginTop: 0 }}>Confirm Your Order</h2>
                        <div style={{ marginBottom: "16px" }}>
                            {getSelectedItemDetails().map((item) => (
                                <div
                                    key={item.item_id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "6px 0",
                                        borderBottom: "1px solid #333"
                                    }}
                                >
                                    <span>{item.name}</span>
                                    <span>Rs. {item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                            <strong>Total:</strong> Rs. {calculateRunningTotal().toFixed(2)}
                        </p>

                        <button onClick={confirmOrder} disabled={isSubmitting}>
                            {isSubmitting ? "Placing Order..." : "Confirm Order"}
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            disabled={isSubmitting}
                            style={{
                                marginLeft: "10px",
                                backgroundImage: "none",
                                backgroundColor: "#444"
                            }}
                        >
                            Make Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}