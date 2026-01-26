import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import doctorReportService from '../api/doctorReportService';


const DoctorReportManagement = () => {
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
      const data = await doctorReportService.getAllDoctorReports();
      setReports(data);
    } catch (err) {
      setError('Greška pri učitavanju izveštaja');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await doctorReportService.updateDoctorReport(editingItem.id, data);
      } else {
        await doctorReportService.createDoctorReport(data);
      }
      await fetchReports();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju izveštaja');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj izveštaj?')) {
      try {
        await doctorReportService.deleteDoctorReport(id);
        await fetchReports();
      } catch (err) {
        setError('Greška pri brisanju izveštaja');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Lekarski Izveštaji">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Lekarski Izveštaji" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Izveštaj"
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