import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import enrollmentConfirmationService from '../api/enrollmentConfirmationService';
import medicalRecordService from '../api/medicalRecordService';

const EnrollmentConfirmationManagement = () => {
  const [confirmations, setConfirmations] = useState([]);
  const [filteredConfirmations, setFilteredConfirmations] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConfirmations();
    fetchMedicalRecords();
  }, []);

  // Filter confirmations when selection changes
  useEffect(() => {
    if (selectedMedicalRecord === '') {
      setFilteredConfirmations(confirmations);
    } else {
      const filtered = confirmations.filter(
        confirmation => confirmation.medicalRecordId === parseInt(selectedMedicalRecord)
      );
      setFilteredConfirmations(filtered);
    }
  }, [selectedMedicalRecord, confirmations]);

  const fetchConfirmations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentConfirmationService.getAllEnrollmentConfirmations();
      setConfirmations(data);
      setFilteredConfirmations(data);
    } catch (err) {
      setError('Greška pri učitavanju potvrda');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
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
    { key: 'issuedAt', label: 'Izdato', render: (val) => formatDate(val) },
    { key: 'validUntil', label: 'Važi do', render: (val) => formatDate(val) },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'ACTIVE': { bg: '#d1fae5', color: '#065f46' },
          'EXPIRED': { bg: '#fee2e2', color: '#991b1b' },
          'REVOKED': { bg: '#f3f4f6', color: '#1f2937' }
        };
        const labels = {
          'ACTIVE': 'Aktivna',
          'EXPIRED': 'Istekla',
          'REVOKED': 'Poništena'
        };
        const style = colors[val] || { bg: '#f3f4f6', color: '#1f2937' };
        return (
          <span style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: style.bg,
            color: style.color
          }}>
            {labels[val] || val}
          </span>
        );
      }
    }
  ];

  const fields = [
    { 
      name: 'medicalRecordId', 
      label: 'Zdravstveni karton', 
      type: 'select',
      required: true,
      fullWidth: true,
      options: medicalRecords.map(record => ({
        value: record.id,
        label: `${record.childName} ${record.childSurname} (ID: ${record.id})`
      }))
    },
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

  const formatDate = (val) => {
    if (!val || !Array.isArray(val)) return '-';
    
    const [year, month, day] = val;
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('sr-RS');
  };

  const formatDateForInput = (val) => {
    if (!val || !Array.isArray(val)) return '';

    const [year, month, day, hour = 0, minute = 0] = val;

    const m = month.toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    const h = hour.toString().padStart(2, '0');
    const min = minute.toString().padStart(2, '0');

    return `${year}-${m}-${d}T${h}:${min}`;
  };

  const handleSubmit = async (data) => {
    try {
      const preparedData = {
        ...data,
        medicalRecordId: parseInt(data.medicalRecordId),
        issuedAt: data.issuedAt.includes('T') ? `${data.issuedAt}:00` : `${data.issuedAt}T00:00:00`,
        validUntil: data.validUntil.includes('T') ? `${data.validUntil}:00` : `${data.validUntil}T00:00:00`
      };

      if (editingItem) {
        await enrollmentConfirmationService.updateEnrollmentConfirmation(editingItem.id, preparedData);
      } else {
        await enrollmentConfirmationService.createEnrollmentConfirmation(preparedData);
      }

      await fetchConfirmations();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Greška pri čuvanju potvrde');
      }
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovu potvrdu?')) {
      return;
    }

    try {
      await enrollmentConfirmationService.deleteEnrollmentConfirmation(id);
      await fetchConfirmations();
    } catch (err) {
      setError('Greška pri brisanju potvrde');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Potvrde za Upis">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
          <div style={{ color: '#6b7280' }}>Učitavanje...</div>
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
        <div style={{
          marginBottom: '16px',
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          color: '#991b1b'
        }}>
          {error}
          <button 
            onClick={() => setError(null)} 
            style={{
              float: 'right',
              fontWeight: 'bold',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#991b1b'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Section */}
      <div style={{
        marginBottom: '24px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <label style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151',
            whiteSpace: 'nowrap'
          }}>
            Filtriraj po detetu:
          </label>
          <select
            value={selectedMedicalRecord}
            onChange={(e) => setSelectedMedicalRecord(e.target.value)}
            style={{
              flex: 1,
              maxWidth: '448px',
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '14px'
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #a78bfa';
              e.target.style.outlineOffset = '0px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
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
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
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
        data={filteredConfirmations} 
        onEdit={(item) => { 
          setEditingItem({
            ...item,
            issuedAt: formatDateForInput(item.issuedAt),
            validUntil: formatDateForInput(item.validUntil)
          }); 
          setIsModalOpen(true); 
        }} 
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