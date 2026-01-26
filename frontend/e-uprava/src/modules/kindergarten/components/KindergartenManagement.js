import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import kindergartenService from '../api/kindergartenService';

const KindergartenManagement = () => {
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

  if (loading) {
    return (
      <PageWrapper title="Vrtići">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
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
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={kindergartens} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
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