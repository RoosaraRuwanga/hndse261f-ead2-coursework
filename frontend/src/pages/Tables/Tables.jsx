import { useEffect, useState } from "react";
import { getTables } from "../../services/tableService";

export default function Tables() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        loadTables();
    }, []);

    async function loadTables() {
        const data = await getTables();
        setTables(data);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "40px", maxWidth: "1100px", width: "100%" }}>
                <h1 style={{ marginBottom: "4px", textAlign: "center" }}>Tables</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", textAlign: "center" }}>
                    View table status
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {tables.map((table) => (
                        <div
                            key={table.tableId}
                            style={{
                                backgroundColor: "#2a1a1a",
                                borderRadius: "10px",
                                padding: "20px",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <h2 style={{ margin: 0 }}>Table {table.tableNumber ?? table.tableId}</h2>
                                <span
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: "12px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        backgroundColor: table.status === "Free" ? "#2d6a4f" : "#e63946"
                                    }}
                                >
                                    {table.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}