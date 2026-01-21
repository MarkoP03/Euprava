import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const EnrollmentConfirmationManagement = () => {
  const [confirmations, setConfirmations] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      issuedAt: '2025-01-15', 
      validUntil: '2025-07-15', 
      status: 'ACTIVE' 
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'issuedAt', label: 'Izdato', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { key: 'validUntil', label: 'Važi do', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'ACTIVE': 'bg-green-100 text-green-800',
          'EXPIRED': 'bg-red-100 text-red-800',
          'REVOKED': 'bg-gray-100 text-gray-800'
        };
        const labels = {
          'ACTIVE': 'Aktivna',
          'EXPIRED': 'Istekla',
          'REVOKED': 'Poništena'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[val] || 'bg-gray-100 text-gray-800'}`}>
            {labels[val] || val}
          </span>
        );
      }
    }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'issuedAt', label: 'Datum izdavanja', type: 'datetime-local', required: true },
    { name: 'validUntil', label: 'Važi do', type: 'datetime-local', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'ACTIVE', label: 'Aktivna' },
        { value: 'EXPIRED', label: 'Istekla' },
        { value: 'REVOKED', label: 'Poništena' }
      ]
    }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setConfirmations(confirmations.map(c => c.id === editingItem.id ? { ...data, id: editingItem.id } : c));
    } else {
      setConfirmations([...confirmations, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu potvrdu?')) {
      setConfirmations(confirmations.filter(c => c.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Potvrde za Upis" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Potvrdu"
    >
      <DataTable 
        columns={columns} 
        data={confirmations} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      <FormModal
        title={editingItem ? 'Izmeni Potvrdu' : 'Dodaj Novu Potvrdu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default EnrollmentConfirmationManagement;