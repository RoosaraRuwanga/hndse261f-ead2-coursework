import { useEffect, useState } from "react";
import { getItem } from "../services/itemService";

export default function OrderCard({ order }) {
    const [itemDetails, setItemDetails] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function loadItems() {
            const results = await Promise.all(
                order.items.map((itemId) => getItem(itemId))
            );
            setItemDetails(results);
            const sum = results.reduce((acc, item) => acc + (item?.price ?? 0), 0);
            setTotal(sum);
        }
        if (order.items && order.items.length > 0) {
            loadItems();
        }
    }, [order.items]);

    return (
        <div style={{
            border: "2px solid white",
            padding: "16px",
            margin: "12px",
            width: "220px",
            color: "white",
            background: "black"
        }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order Items:</strong></p>
            <ul>
                {itemDetails.map((item) => (
                    <li key={item.item_id}>{item.name} - ${(item.price ?? 0).toFixed(2)}</li>
                ))}
            </ul>
            <p><strong>Total Price:</strong> ${(total ?? 0).toFixed(2)}</p>
        </div>
    );
}