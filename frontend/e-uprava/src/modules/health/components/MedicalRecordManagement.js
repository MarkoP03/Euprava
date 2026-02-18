import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import PageWrapper from '../../shared/components/PageWrapper';
import medicalRecordService from '../api/medicalRecordService';

const MedicalRecordManagement = () => {
  const [records, setRecords] = useState([]);
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
    { key: 'lastCheck', label: 'Poslednji pregled', render: (val) => formatDate(val) },
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

  const formatDate = (val) => {
    if (!val || !Array.isArray(val)) return '-';
    
    const [year, month, day] = val;
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('sr-RS');
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
    <PageWrapper title="Zdravstveni Kartoni">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={records}
      />
    </PageWrapper>
  );
};

export default MedicalRecordManagement;