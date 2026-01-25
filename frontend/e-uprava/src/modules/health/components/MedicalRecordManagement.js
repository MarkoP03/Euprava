import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import medicalRecordService from '../../services/medicalRecordService';

const MedicalRecordManagement = () => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicalRecordService.getAllMedicalRecords();
      setRecords(data);
    } catch (err) {
      setError('Greška pri učitavanju kartona');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await medicalRecordService.updateMedicalRecord(editingItem.id, data);
      } else {
        await medicalRecordService.createMedicalRecord(data);
      }
      await fetchRecords();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju kartona');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj karton?')) {
      try {
        await medicalRecordService.deleteMedicalRecord(id);
        await fetchRecords();
      } catch (err) {
        setError('Greška pri brisanju kartona');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Zdravstveni Kartoni">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Zdravstveni Kartoni" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Novi Karton"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
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