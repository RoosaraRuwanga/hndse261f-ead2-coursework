import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import OrderList from "./pages/Orders/OrderList";
import Employees from "./pages/Employees/Employees";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Automatically redirects root URL to needed page, replace with Login in final */}
        <Route path="/" element={<Navigate replace to="/orderlist" />} />
        
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
