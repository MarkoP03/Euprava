import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const ReportOfIllnessManagement = () => {
  const [reports, setReports] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      status: 'PENDING', 
      problem: 'Temperatura 38.5°C', 
      answer: '',
      urgent: true
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'PENDING': 'bg-yellow-100 text-yellow-800',
          'IN_PROGRESS': 'bg-blue-100 text-blue-800',
          'RESOLVED': 'bg-green-100 text-green-800'
        };
        const labels = {
          'PENDING': 'Na čekanju',
          'IN_PROGRESS': 'U obradi',
          'RESOLVED': 'Rešeno'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[val] || 'bg-gray-100 text-gray-800'}`}>
            {labels[val] || val}
          </span>
        );
      }
    },
    { key: 'problem', label: 'Problem', render: (text) => text.substring(0, 40) + (text.length > 40 ? '...' : '') },
    { 
      key: 'urgent', 
      label: 'Hitno', 
      render: (val) => val ? (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
          🚨 Hitno
        </span>
      ) : 'Ne'
    }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'PENDING', label: 'Na čekanju' },
        { value: 'IN_PROGRESS', label: 'U obradi' },
        { value: 'RESOLVED', label: 'Rešeno' }
      ]
    },
    { name: 'problem', label: 'Opis problema', type: 'textarea', required: true, fullWidth: true },
    { name: 'answer', label: 'Odgovor lekara', type: 'textarea', fullWidth: true },
    { name: 'urgent', label: 'Hitno', type: 'checkbox' }
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
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu prijavu?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Prijave Bolesti" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Prijavu"
    >
      <DataTable 
        columns={columns} 
        data={reports} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      <FormModal
        title={editingItem ? 'Izmeni Prijavu' : 'Dodaj Novu Prijavu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default ReportOfIllnessManagement;