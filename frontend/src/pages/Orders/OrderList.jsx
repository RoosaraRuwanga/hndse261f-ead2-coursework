import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";
import OrderCard from "../../components/OrderCard";

export default function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        const data = await getOrders();
        setOrders(data);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Order List</h1>
            <p>Current Orders in System:</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}