import React, { useState, useEffect } from "react";

const DataTable = ({ columns, data, onEdit, onDelete, customActions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="data-table-wrapper">
      {/* Search */}
      <div className="data-table-search">
        <span>🔍</span>

        <input
          type="text"
          className="form-input"
          placeholder="Pretraži..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}

              <th style={{ textAlign: "center" }}>Akcije</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key] || "-"}
                    </td>
                  ))}

                  <td>
                    <div className="table-actions">
                      {/* Custom Actions */}
                      {customActions && customActions(row)}

                      {onEdit && (
                        <button
                          className="btn-table edit"
                          onClick={() => onEdit(row)}
                          title="Izmeni"
                        >
                          ✏️
                        </button>
                      )}

                      {onDelete && (
                        <button
                          className="btn-table delete"
                          onClick={() => onDelete(row.id)}
                          title="Obriši"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="data-table-empty">
                  {searchTerm ? "🔍 Nema rezultata" : "📋 Nema podataka"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="data-table-pagination">
          <div className="data-table-info">
            Prikazano <b>{startIndex + 1}</b>–
            <b>{Math.min(startIndex + itemsPerPage, filteredData.length)}</b> od{" "}
            <b>{filteredData.length}</b>
          </div>

          <div className="pagination-buttons">
            <button
              className="btn-page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ← Prethodna
            </button>

            <button
              className="btn-page"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Sledeća →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
