import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Navbar
        variant="app"
        title={title}
        onMenuToggle={() => setSidebarOpen((current) => !current)}
      />

      <div className="app-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={`sidebar-backdrop ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
