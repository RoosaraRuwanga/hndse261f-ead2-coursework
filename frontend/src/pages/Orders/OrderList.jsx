import { useEffect, useState } from "react";
import { getAllItems } from "../../services/itemService";
import { createOrder } from "../../services/orderService";

export default function OrderList() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        const data = await getAllItems();
        setItems(data);
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
            const item = items.find((i) => i.itemId === itemId);
            return sum + (item ? (item.price ?? 0) : 0);
        }, 0);
    }

    function getSelectedItemDetails() {
        return selectedItems
            .map((id) => items.find((i) => i.itemId === id))
            .filter(Boolean);
    }

    async function confirmOrder() {
        await createOrder({
            customerName: "Guest",
            totalAmount: calculateRunningTotal(),
            orderStatus: "Pending",
            paymentStatus: "Unpaid"
        });

        setSelectedItems([]);
        setShowConfirm(false);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "700px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Order List</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    Select items to build a new order
                </p>

                <div
                    style={{
                        backgroundColor: "#2a1a1a",
                        borderRadius: "10px",
                        padding: "24px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                    }}
                >
                    <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
                        Menu
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {items.map((item) => {
                            const isSelected = selectedItems.includes(item.itemId);
                            return (
                                <label
                                    key={item.itemId}
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
                                            onChange={() => toggleItem(item.itemId)}
                                        />
                                        {item.name}
                                    </span>
                                    <span style={{ fontWeight: "bold" }}>
                                        Rs. {(item.price ?? 0).toFixed(2)}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

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
                                    key={item.itemId}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "6px 0",
                                        borderBottom: "1px solid #333"
                                    }}
                                >
                                    <span>{item.name}</span>
                                    <span>Rs. {(item.price ?? 0).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                            <strong>Total:</strong> Rs. {calculateRunningTotal().toFixed(2)}
                        </p>

                        <button onClick={confirmOrder}>Confirm Order</button>
                        <button
                            onClick={() => setShowConfirm(false)}
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