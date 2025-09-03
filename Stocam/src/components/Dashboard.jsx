import React from "react";

function Dashboard() {
  // Exemplo de dados estáticos
  const dataMatrixInfo = [
    { id: 1, code: "ABC123", date: "2025-09-03", status: "Lido" },
    { id: 2, code: "XYZ789", date: "2025-09-02", status: "Pendente" },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataMatrixInfo.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;