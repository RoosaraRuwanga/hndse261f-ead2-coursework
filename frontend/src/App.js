import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import './App.css';
import OrderList from "./pages/Orders/OrderList";
import Employees from "./pages/Employees/Employees";
import Tables from "./pages/Tables/Tables";
import Items from "./pages/Items/Items";
import Ingredients from "./pages/Ingredients/Ingredients";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout";

function App() {
  const stored = localStorage.getItem("loggedInEmployee");
  const [loggedInEmployee, setLoggedInEmployee] = useState(stored ? JSON.parse(stored) : null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLoginSuccess={setLoggedInEmployee} />} />

        <Route
          path="/orderlist"
          element={
            <Layout employeeName={loggedInEmployee?.name} employeeRole={loggedInEmployee?.role}>
              <OrderList />
            </Layout>
          }
        />
        <Route
          path="/employees"
          element={
            <Layout employeeName={loggedInEmployee?.name} employeeRole={loggedInEmployee?.role}>
              <Employees />
            </Layout>
          }
        />
        <Route
          path="/tables"
          element={
            <Layout employeeName={loggedInEmployee?.name} employeeRole={loggedInEmployee?.role}>
              <Tables />
            </Layout>
          }
        />
        <Route
          path="/items"
          element={
            <Layout employeeName={loggedInEmployee?.name} employeeRole={loggedInEmployee?.role}>
              <Items />
            </Layout>
          }
        />
        <Route
          path="/ingredients"
          element={
            <Layout employeeName={loggedInEmployee?.name} employeeRole={loggedInEmployee?.role}>
              <Ingredients />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;