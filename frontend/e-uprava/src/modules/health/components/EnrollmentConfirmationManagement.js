import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import enrollmentConfirmationService from '../../services/enrollmentConfirmationService';

const EnrollmentConfirmationManagement = () => {
  const [confirmations, setConfirmations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const fetchConfirmations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentConfirmationService.getAllEnrollmentConfirmations();
      setConfirmations(data);
    } catch (err) {
      setError('Greška pri učitavanju potvrda');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await enrollmentConfirmationService.updateEnrollmentConfirmation(editingItem.id, data);
      } else {
        await enrollmentConfirmationService.createEnrollmentConfirmation(data);
      }
      await fetchConfirmations();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju potvrde');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu potvrdu?')) {
      try {
        await enrollmentConfirmationService.deleteEnrollmentConfirmation(id);
        await fetchConfirmations();
      } catch (err) {
        setError('Greška pri brisanju potvrde');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Potvrde za Upis">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Potvrde za Upis" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Potvrdu"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
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