import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const MedicalRecordManagement = () => {
  const [records, setRecords] = useState([
    { 
      id: 1, 
      childId: 1, 
      childName: 'Marko', 
      childSurname: 'Marković', 
      parentContact: '0641234567',
      lastCheck: '2025-01-10T10:30',
      canJoinTheCollective: true
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'childId', label: 'ID Deteta' },
    { key: 'childName', label: 'Ime' },
    { key: 'childSurname', label: 'Prezime' },
    { key: 'parentContact', label: 'Kontakt' },
    { key: 'lastCheck', label: 'Poslednji pregled', render: (val) => val ? new Date(val).toLocaleDateString('sr-RS') : '-' },
    { 
      key: 'canJoinTheCollective', 
      label: 'Status',
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          val ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {val ? '✓ Može u kolektiv' : '✗ Ne može'}
        </span>
      )
    }
  ];

  const fields = [
    { name: 'childId', label: 'ID Deteta', type: 'number', required: true },
    { name: 'childName', label: 'Ime deteta', required: true },
    { name: 'childSurname', label: 'Prezime deteta', required: true },
    { name: 'parentContact', label: 'Kontakt roditelja', required: true },
    { name: 'lastCheck', label: 'Datum poslednjeg pregleda', type: 'datetime-local', required: true },
    { name: 'canJoinTheCollective', label: 'Može u kolektiv', type: 'checkbox' }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setRecords(records.map(r => r.id === editingItem.id ? { ...data, id: editingItem.id } : r));
    } else {
      setRecords([...records, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj karton?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Zdravstveni Kartoni" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Novi Karton"
    >
      <DataTable 
        columns={columns} 
        data={records} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      <FormModal
        title={editingItem ? 'Izmeni Karton' : 'Novi Zdravstveni Karton'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default MedicalRecordManagement;