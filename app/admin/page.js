"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function unlock(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/stats", { headers: { "x-admin-key": key } });
    if (!res.ok) {
      setError("Wrong key, or something went wrong.");
      return;
    }
    setData(await res.json());
    setUnlocked(true);
  }

  function downloadCsv() {
    if (!data) return;
    const rows = [
      ["Ticket ID", "Name", "Email", "Phone", "Type", "Checked In"],
      ...data.tickets.map((t) => [
        t.ticketId,
        t.fullName,
        t.email,
        t.phone,
        t.ticketType,
        t.checkedIn ? "Yes" : "No",
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dtc-attendees.csv";
    a.click();
  }

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--black)" }}>
        <form onSubmit={unlock} style={{ display: "grid", gap: "12px", width: "280px" }}>
          <label style={{ color: "var(--white)", fontSize: "13px" }}>Admin key</label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: "10px", border: "none" }}
          />
          {error && <p style={{ color: "var(--red)", fontSize: "12px" }}>{error}</p>}
          <button
            type="submit"
            style={{ background: "var(--red)", color: "var(--white)", padding: "12px 0", borderRadius: "10px" }}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const filteredTickets = data.tickets.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.fullName?.toLowerCase().includes(q) ||
      t.email?.toLowerCase().includes(q) ||
      t.phone?.toLowerCase().includes(q) ||
      t.ticketId?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: "40px 5vw", fontFamily: "var(--font-body)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px" }}>DTC Admin</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", margin: "24px 0" }}>
        <StatCard label="Tickets Sold" value={data.totalTicketsSold} />
        <StatCard label="Revenue" value={`₦${data.totalRevenue.toLocaleString()}`} />
        <StatCard label="Checked In" value={data.totalCheckedIn} />
        <StatCard label="Orders" value={data.totalOrders} />
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          placeholder="Search by name, email, phone, or ticket ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 260px", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid var(--gray-300)" }}
        />
        <button onClick={downloadCsv} style={{ background: "var(--black)", color: "var(--white)", padding: "10px 20px", borderRadius: "10px" }}>
          Download CSV
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid var(--black)" }}>
              <th style={{ padding: "8px" }}>Ticket ID</th>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Email</th>
              <th style={{ padding: "8px" }}>Type</th>
              <th style={{ padding: "8px" }}>Checked In</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((t) => (
              <tr key={t.ticketId} style={{ borderBottom: "1px solid var(--gray-300)" }}>
                <td style={{ padding: "8px" }}>{t.ticketId}</td>
                <td style={{ padding: "8px" }}>{t.fullName}</td>
                <td style={{ padding: "8px" }}>{t.email}</td>
                <td style={{ padding: "8px" }}>{t.ticketType}</td>
                <td style={{ padding: "8px" }}>{t.checkedIn ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ background: "var(--gray-100)", borderRadius: "16px", padding: "20px 26px", minWidth: "140px" }}>
      <p style={{ fontSize: "12px", color: "var(--gray-600)" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "28px" }}>{value}</p>
    </div>
  );
}
