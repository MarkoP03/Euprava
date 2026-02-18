import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import reportOfIllnessService from '../api/reportOfIllnessService';
import medicalRecordService from '../api/medicalRecordService';

const ReportOfIllnessManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchMedicalRecords();
  }, []);

  useEffect(() => {
    if (selectedMedicalRecord === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(
        report => report.medicalRecordId === parseInt(selectedMedicalRecord)
      );
      setFilteredReports(filtered);
    }
  }, [selectedMedicalRecord, reports]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportOfIllnessService.getAllReportOfIllnesses();
      setReports(data);
      setFilteredReports(data);
    } catch (err) {
      setError('Greška pri učitavanju prijava');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (val) => {
    if (!val || !Array.isArray(val)) return '-';
    
    const [year, month, day] = val;
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('sr-RS');
  };

  const fetchMedicalRecords = async () => {
    try {
      const data = await medicalRecordService.getAllMedicalRecords();
      setMedicalRecords(data);
    } catch (err) {
      console.error('Error fetching medical records:', err);
      setError('Greška pri učitavanju zdravstvenih kartona');
    }
  };

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'childName', label: 'Ime deteta' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        const colors = {
          'PENDING': { bg: '#fef3c7', color: '#92400e' },
          'IN_PROGRESS': { bg: '#dbeafe', color: '#1e40af' },
          'RESOLVED': { bg: '#d1fae5', color: '#065f46' }
        };
        const labels = {
          'PENDING': 'Na čekanju',
          'IN_PROGRESS': 'U obradi',
          'RESOLVED': 'Rešeno'
        };
        const style = colors[val] || { bg: '#f3f4f6', color: '#1f2937' };
        return (
          <span style={{
            padding: '6px 12px', borderRadius: '9999px', fontSize: '12px',
            fontWeight: 600, backgroundColor: style.bg, color: style.color
          }}>
            {labels[val] || val}
          </span>
        );
      }
    },
    {
      key: 'problem',
      label: 'Problem',
      render: (text) => text.substring(0, 40) + (text.length > 40 ? '...' : '')
    },
    {
      key: 'answer',
      label: 'Odgovor lekara',
      render: (text) => text
        ? text.substring(0, 40) + (text.length > 40 ? '...' : '')
        : <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Nema odgovora</span>
    },
    {
      key: 'urgent',
      label: 'Hitno',
      render: (val) => val ? (
        <span style={{
          padding: '6px 12px', borderRadius: '9999px', fontSize: '12px',
          fontWeight: 600, backgroundColor: '#fee2e2', color: '#991b1b'
        }}>
          🚨 Hitno
        </span>
      ) : 'Ne'
    },
    { key: 'createdAt', label: 'Kreirana', render: (val) => formatDate(val) },
  ];

  const fields = [
    { name: 'answer', label: 'Odgovor lekara', type: 'textarea', required: true, fullWidth: true }
  ];

  const handleSubmit = async (data) => {
    try {
      const reportData = {
        ...editingItem,
        answer: data.answer
      };
      await reportOfIllnessService.updateReportOfIllness(editingItem.id, reportData);
      await fetchReports();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Greška pri čuvanju odgovora');
      }
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Prijave Bolesti">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
          <div style={{ color: '#6b7280' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Prijave Bolesti">
      {error && (
        <div style={{
          marginBottom: '16px', padding: '16px', backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5', borderRadius: '8px', color: '#991b1b'
        }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{ float: 'right', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', color: '#991b1b' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Section */}
      <div style={{
        marginBottom: '24px', backgroundColor: 'white', padding: '16px',
        borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>
            Filtriraj po detetu:
          </label>
          <select
            value={selectedMedicalRecord}
            onChange={(e) => setSelectedMedicalRecord(e.target.value)}
            style={{
              flex: 1, maxWidth: '448px', padding: '8px 16px',
              border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px'
            }}
            onFocus={(e) => { e.target.style.outline = '2px solid #a78bfa'; }}
            onBlur={(e) => { e.target.style.outline = 'none'; }}
          >
            <option value="">Svi kartoni</option>
            {medicalRecords.map(record => (
              <option key={record.id} value={record.id}>
                {record.childName} {record.childSurname} (ID: {record.id})
              </option>
            ))}
          </select>
          {selectedMedicalRecord && (
            <button
              onClick={() => setSelectedMedicalRecord('')}
              style={{
                padding: '8px 16px', fontSize: '14px', fontWeight: 500, color: '#374151',
                backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              Resetuj filter
            </button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredReports}
        onEdit={(item) => {
          setEditingItem(item);
          setIsModalOpen(true);
        }}
      />

      <FormModal
        title="Unesi odgovor"
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={{ answer: editingItem?.answer || '' }}
      />
    </PageWrapper>
  );
};

export default ReportOfIllnessManagement;