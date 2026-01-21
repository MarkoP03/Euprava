import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const DoctorReportManagement = () => {
  const [reports, setReports] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      date: '2025-01-10', 
      diagnosis: 'Prehlada', 
      recommendation: 'Odmor 3 dana' 
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'date', label: 'Datum', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { key: 'diagnosis', label: 'Dijagnoza' },
    { key: 'recommendation', label: 'Preporuka', render: (text) => text.substring(0, 50) + (text.length > 50 ? '...' : '') }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'date', label: 'Datum pregleda', type: 'datetime-local', required: true },
    { name: 'diagnosis', label: 'Dijagnoza', type: 'textarea', required: true, fullWidth: true },
    { name: 'recommendation', label: 'Preporuka', type: 'textarea', required: true, fullWidth: true }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setReports(reports.map(r => r.id === editingItem.id ? { ...data, id: editingItem.id } : r));
    } else {
      setReports([...reports, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj izveštaj?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Lekarski Izveštaji" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Izveštaj"
    >
      <DataTable 
        columns={columns} 
        data={reports} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      <FormModal
        title={editingItem ? 'Izmeni Izveštaj' : 'Dodaj Novi Izveštaj'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default DoctorReportManagement;