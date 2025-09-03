import React from "react";
import "../Styles/Dashboard.css";

function Dashboard() {
  const rows = [
    {
      id: 1,
      medicamento: "Paracetamol 500mg",
      quantidade: 20,
      data: "2025-09-03",
    },
    { id: 2, medicamento: "Dipirona 1g", quantidade: 10, data: "2025-09-02" },
    {
      id: 3,
      medicamento: "Amoxicilina 500mg",
      quantidade: 5,
      data: "2025-09-01",
    },
  ];

  return (
    <div className="dm-container">
      <h2 className="dm-title">📊 Estoque de Medicamentos</h2>

      <div className="dm-card">
        <table className="dm-table">
          <colgroup>
            <col style={{ width: "calc(100% / 3)" }} />
            <col style={{ width: "calc(100% / 3)" }} />
            <col style={{ width: "calc(100% / 3)" }} />
          </colgroup>
          <thead className="dm-thead">
            <tr>
              <th className="dm-th">Medicamento</th>
              <th className="dm-th">Quantidade</th>
              <th className="dm-th">Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="dm-tr">
                <td className="dm-td">{r.medicamento}</td>
                <td className="dm-td">{r.quantidade}</td>
                <td className="dm-td">{r.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
