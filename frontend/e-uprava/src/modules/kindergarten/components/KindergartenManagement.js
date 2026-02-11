import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import kindergartenService from '../api/kindergartenService';

const KindergartenManagement = () => {
  const navigate = useNavigate();
  const [kindergartens, setKindergartens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKindergartens();
  }, []);

  const fetchKindergartens = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kindergartenService.getAllKindergartens();
      setKindergartens(data);
    } catch (err) {
      setError('Greška pri učitavanju vrtića');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Naziv' },
    { key: 'address', label: 'Adresa' },
    { key: 'lat', label: 'Latitude' },
    { key: 'lng', label: 'Longitude' }
  ];

  const fields = [
    { name: 'name', label: 'Naziv vrtića', required: true, fullWidth: true },
    { name: 'address', label: 'Adresa', required: true, fullWidth: true },
    { name: 'lat', label: 'Latitude', type: 'number', step: 'any', required: true },
    { name: 'lng', label: 'Longitude', type: 'number', step: 'any', required: true }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await kindergartenService.updateKindergarten(editingItem.id, data);
      } else {
        await kindergartenService.createKindergarten(data);
      }
      await fetchKindergartens();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju vrtića');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj vrtić?')) {
      try {
        await kindergartenService.deleteKindergarten(id);
        await fetchKindergartens();
      } catch (err) {
        setError('Greška pri brisanju vrtića');
        console.error('Error:', err);
      }
    }
  };

  // Custom actions function
  const customActions = (row) => (
    <button
      className="btn-table employees"
      onClick={() => navigate(`/kindergarten/${row.id}/employees`)}
      title="Zaposleni"
      style={{
        backgroundColor: '#10b981',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
        marginRight: '8px',
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
    >
      👥 Zaposleni
    </button>
  );

  if (loading) {
    return (
      <PageWrapper title="Vrtići">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <div style={{ color: '#6b7280', fontSize: '16px' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Vrtići" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Vrtić"
    >
      {error && (
        <div style={{
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          color: '#991b1b',
          position: 'relative'
        }}>
          {error}
          <button 
            onClick={() => setError(null)} 
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#991b1b'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={kindergartens} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
        customActions={customActions}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Vrtić' : 'Dodaj Novi Vrtić'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default KindergartenManagement;