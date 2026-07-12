import Sidebar from "./Sidebar";

export default function Layout({ children, employeeName, employeeRole }) {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar employeeName={employeeName} employeeRole={employeeRole} />
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
}