import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Orders", path: "/orderlist" },
    { label: "Tables", path: "/tables" },
    { label: "Items", path: "/items" },
    { label: "Ingredients", path: "/ingredients" },
    { label: "Employees", path: "/employees" },
];

export default function Sidebar({ employeeName, employeeRole }) {
    const location = useLocation();

    return (
        <div
            style={{
                width: "220px",
                minHeight: "100vh",
                backgroundColor: "#1a1a1a",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "20px 0"
            }}
        >

            <nav style={{ flex: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: "block",
                                padding: "12px 20px",
                                color: "white",
                                textDecoration: "none",
                                backgroundColor: isActive ? "#e63946" : "transparent"
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 20px",
                    borderTop: "1px solid #333"
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "36px",
                        height: "36px",
                        flexShrink: 0
                    }}
                >
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#555",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "14px"
                        }}
                    >
                        {employeeName ? employeeName.charAt(0).toUpperCase() : "?"}
                    </div>
                    <span
                        style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#3ddc84",
                            border: "2px solid #1a1a1a"
                        }}
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <strong>{employeeName || "Guest"}</strong>
                    <br />
                    <span style={{ fontSize: "13px", color: "#aaa" }}>{employeeRole || ""}</span>
                </div>

                <span style={{ color: "#aaa" }}>⌄</span>
            </div>
        </div>
    );
}