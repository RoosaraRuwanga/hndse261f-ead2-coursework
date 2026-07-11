import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";
import { getAllItems } from "../../services/itemService";
import OrderCard from "../../components/OrderCard";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        loadOrders();
        loadItems();
    }, []);

    async function loadOrders() {
        const data = await getOrders();
        setOrders(data);
    }

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
            const item = items.find((i) => i.item_id === itemId);
            return sum + (item ? item.price : 0);
        }, 0);
    }

    function getSelectedItemDetails() {
        return selectedItems
            .map((id) => items.find((i) => i.item_id === id))
            .filter(Boolean);
    }

    async function confirmOrder() {
        await fetch("http://localhost:8082/order-service/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Pending",
                items: selectedItems,
                total_price: 0
            })
        });

        setSelectedItems([]);
        setShowConfirm(false);
        loadOrders();
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Order List</h1>

            <div style={{ marginBottom: "30px" }}>
                <h2>Select Items:</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {items.map((item) => (
                        <label
                            key={item.item_id}
                            style={{
                                border: "1px solid white",
                                padding: "8px 12px",
                                color: "white",
                                cursor: "pointer",
                                width: "fit-content"
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.item_id)}
                                onChange={() => toggleItem(item.item_id)}
                            />{" "}
                            {item.name} - Rs. {item.price.toFixed(2)}
                        </label>
                    ))}
                </div>

                <p style={{ marginTop: "12px", fontSize: "18px" }}>
                    <strong>Running Total: Rs. {calculateRunningTotal().toFixed(2)}</strong>
                </p>

                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={selectedItems.length === 0}
                >
                    Checkout
                </button>
            </div>

            {showConfirm && (
                <div
                    style={{
                        border: "2px solid white",
                        padding: "20px",
                        marginBottom: "30px",
                        maxWidth: "400px",
                        color: "white"
                    }}
                >
                    <h2>Confirm Your Order</h2>
                    <ul>
                        {getSelectedItemDetails().map((item) => (
                            <li key={item.item_id}>
                                {item.name} - Rs. {item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Total: Rs. {calculateRunningTotal().toFixed(2)}</strong>
                    </p>
                    <button onClick={confirmOrder}>Confirm Order</button>
                    <button onClick={() => setShowConfirm(false)} style={{ marginLeft: "10px" }}>
                        Make Changes
                    </button>
                </div>
            )}
        </div>
    );
}