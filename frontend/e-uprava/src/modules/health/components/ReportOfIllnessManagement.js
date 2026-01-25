import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import reportOfIllnessService from '../../services/reportOfIllnessService';

const ReportOfIllnessManagement = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportOfIllnessService.getAllReportOfIllnesses();
      setReports(data);
    } catch (err) {
      setError('Greška pri učitavanju prijava');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await reportOfIllnessService.updateReportOfIllness(editingItem.id, data);
      } else {
        await reportOfIllnessService.createReportOfIllness(data);
      }
      await fetchReports();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju prijave');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu prijavu?')) {
      try {
        await reportOfIllnessService.deleteReportOfIllness(id);
        await fetchReports();
      } catch (err) {
        setError('Greška pri brisanju prijave');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Prijave Bolesti">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Prijave Bolesti" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Prijavu"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
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