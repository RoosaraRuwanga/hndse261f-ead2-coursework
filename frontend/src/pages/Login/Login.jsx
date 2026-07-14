import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Backend does not expose a /login endpoint.
        // Use the entered username as the display name.
        const employee = { name: username, role: "Employee" };
        localStorage.setItem("loggedInEmployee", JSON.stringify(employee));
        onLoginSuccess(employee);
        navigate("/orderlist");
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}
        >
            <div
                style={{
                    backgroundColor: "#2a1a1a",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    width: "320px",
                    textAlign: "center"
                }}
            >
                <h1 style={{ marginBottom: "6px" }}>Welcome!</h1>
                <p style={{ color: "#bbb", marginBottom: "30px", fontSize: "14px" }}>
                    Employee Login
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "left", marginBottom: "16px" }}>
                        <label style={{ fontSize: "14px" }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "6px",
                                borderRadius: "5px",
                                border: "1px solid #444",
                                backgroundColor: "#1f1414",
                                color: "white",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <div style={{ textAlign: "left", marginBottom: "20px" }}>
                        <label style={{ fontSize: "14px" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "6px",
                                borderRadius: "5px",
                                border: "1px solid #444",
                                backgroundColor: "#1f1414",
                                color: "white",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {error && (
                        <p style={{ color: "#ff6b6b", fontSize: "14px", marginBottom: "16px" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" style={{ width: "100%" }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}