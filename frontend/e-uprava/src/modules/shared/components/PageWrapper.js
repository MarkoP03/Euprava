import React from 'react';

const PageWrapper = ({ title, children, onAdd, addButtonText = "Dodaj" }) => (
  <div style={{ padding: '24px', minHeight: '100vh', background: '#f9fafb' }}>
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          <p style={{ color: '#6b7280', marginTop: '4px', fontSize: '14px' }}>
            Upravljanje i pregled podataka
          </p>
        </div>
        {onAdd && (
          <button onClick={onAdd} className="btn-primary">
            + {addButtonText}
          </button>
        )}
      </div>
      {children}
    </div>
  </div>
);

export default PageWrapper;