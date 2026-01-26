import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import enrollmentService from '../api/enrollmentService';

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentService.getAllEnrollments();
      setEnrollments(data);
    } catch (err) {
      setError('Greška pri učitavanju upisa');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'childId', label: 'ID Deteta' },
    { key: 'kindergartenId', label: 'ID Vrtića' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'PENDING': 'bg-yellow-100 text-yellow-800',
          'APPROVED': 'bg-green-100 text-green-800',
          'REJECTED': 'bg-red-100 text-red-800'
        };
        const labels = {
          'PENDING': 'Na čekanju',
          'APPROVED': 'Odobreno',
          'REJECTED': 'Odbijeno'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[val] || 'bg-gray-100 text-gray-800'}`}>
            {labels[val] || val}
          </span>
        );
      }
    },
    { key: 'confirmationHealthId', label: 'ID Potvrde' }
  ];

  const fields = [
    { name: 'childId', label: 'ID Deteta', type: 'number', required: true },
    { name: 'kindergartenId', label: 'ID Vrtića', type: 'number', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'PENDING', label: 'Na čekanju' },
        { value: 'APPROVED', label: 'Odobreno' },
        { value: 'REJECTED', label: 'Odbijeno' }
      ]
    },
    { name: 'confirmationHealthId', label: 'ID Zdravstvene Potvrde', type: 'number' }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await enrollmentService.updateEnrollment(editingItem.id, data);
      } else {
        await enrollmentService.createEnrollment(data);
      }
      await fetchEnrollments();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju upisa');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj upis?')) {
      try {
        await enrollmentService.deleteEnrollment(id);
        await fetchEnrollments();
      } catch (err) {
        setError('Greška pri brisanju upisa');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Upisi">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Upisi" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Upis"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={enrollments} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Upis' : 'Dodaj Novi Upis'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default EnrollmentManagement;