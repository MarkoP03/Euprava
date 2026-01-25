import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import vaccineService from '../../services/vaccineService';

const VaccineManagement = () => {
  const [vaccines, setVaccines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vaccineService.getAllVaccines();
      setVaccines(data);
    } catch (err) {
      setError('Greška pri učitavanju vakcina');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'name', label: 'Naziv vakcine' },
    { key: 'date', label: 'Datum', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { key: 'note', label: 'Napomena' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'name', label: 'Naziv vakcine', required: true },
    { name: 'date', label: 'Datum vakcinacije', type: 'datetime-local', required: true },
    { name: 'note', label: 'Napomena', type: 'textarea', fullWidth: true }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await vaccineService.updateVaccine(editingItem.id, data);
      } else {
        await vaccineService.createVaccine(data);
      }
      await fetchVaccines();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju vakcine');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu vakcinu?')) {
      try {
        await vaccineService.deleteVaccine(id);
        await fetchVaccines();
      } catch (err) {
        setError('Greška pri brisanju vakcine');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Vakcinacija">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Vakcinacija" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Vakcinu"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={vaccines} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Vakcinu' : 'Dodaj Novu Vakcinu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default VaccineManagement;