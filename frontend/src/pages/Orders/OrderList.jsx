import '../../App.css';
import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
        getOrders().then(setOrders);
  }, []);

  return (
    <div className = "App">
        <h1>Order List</h1>
        <p>Current Orders in System:</p>
          {orders.map(order => (
          <p key={order.id}>
              {order.id}
          </p>
          ))}
    </div>

  );
}