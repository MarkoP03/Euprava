import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const VaccineManagement = () => {
  const [vaccines, setVaccines] = useState([
    { id: 1, medicalRecordId: 1, name: 'MMR', date: '2024-06-15', note: 'Bez reakcija' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleSubmit = (data) => {
    if (editingItem) {
      setVaccines(vaccines.map(v => v.id === editingItem.id ? { ...data, id: editingItem.id } : v));
    } else {
      setVaccines([...vaccines, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu vakcinu?')) {
      setVaccines(vaccines.filter(v => v.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Vakcinacija" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Vakcinu"
    >
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