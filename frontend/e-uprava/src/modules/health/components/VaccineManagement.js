import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import vaccineService from '../api/vaccineService';
import medicalRecordService from '../api/medicalRecordService';
import authService from '../api/authService';

const VaccineManagement = () => {
  const [vaccines, setVaccines] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNurse, setIsNurse] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setIsNurse(user?.role === 'NURSE');
    fetchVaccines();
    fetchMedicalRecords();
  }, []);

  // Filter vaccines when selection changes
  useEffect(() => {
    if (selectedMedicalRecord === '') {
      setFilteredVaccines(vaccines);
    } else {
      const filtered = vaccines.filter(
        vaccine => vaccine.medicalRecordId === parseInt(selectedMedicalRecord)
      );
      setFilteredVaccines(filtered);
    }
  }, [selectedMedicalRecord, vaccines]);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vaccineService.getAllVaccines();
      setVaccines(data);
      setFilteredVaccines(data);
    } catch (err) {
      setError('Greška pri učitavanju vakcina');
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
    { key: 'name', label: 'Naziv vakcine' },
    { key: 'date', label: 'Datum', render: (val) => formatDate(val) },
    { key: 'note', label: 'Napomena' }
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
    { name: 'name', label: 'Naziv vakcine', required: true },
    { name: 'date', label: 'Datum vakcinacije', type: 'date', required: true },
    { name: 'note', label: 'Napomena', type: 'textarea', fullWidth: true }
  ];

  const formatDate = (val) => {
    if (!val || !Array.isArray(val)) return '-';
    
    const [year, month, day] = val;
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('sr-RS');
  };

  const formatDateForInput = (val) => {
    if (!val || !Array.isArray(val)) return '';

    const [year, month, day] = val;

    const m = month.toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');

    return `${year}-${m}-${d}`;
  };

  const handleSubmit = async (data) => {
    try {
      const preparedData = {
        ...data,
        medicalRecordId: parseInt(data.medicalRecordId),
        date: `${data.date}T00:00:00`
      };

      if (editingItem) {
        await vaccineService.updateVaccine(editingItem.id, preparedData);
      } else {
        await vaccineService.createVaccine(preparedData);
      }

      await fetchVaccines();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Greška pri čuvanju vakcine');
      }
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovu vakcinu?')) {
      return;
    }

    try {
      await vaccineService.deleteVaccine(id);
      await fetchVaccines();
    } catch (err) {
      setError('Greška pri brisanju vakcine');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Vakcinacija">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
          <div style={{ color: '#6b7280' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Vakcinacija" 
      onAdd={
        isNurse
          ? () => {
              setEditingItem(null);
              setIsModalOpen(true);
            }
          : null
      }
      addButtonText={isNurse ? 'Dodaj Vakcinu' : null}
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
        data={filteredVaccines} 
        onEdit={
          isNurse
            ? (item) => {
                setEditingItem({
                  ...item,
                  date: formatDateForInput(item.date)
                });
                setIsModalOpen(true);
              }
            : null
        }
        onDelete={isNurse ? handleDelete : null}
      />
      
      {isNurse && (
        <FormModal
          title={editingItem ? 'Izmeni Vakcinu' : 'Dodaj Novu Vakcinu'}
          fields={fields}
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
          onSubmit={handleSubmit}
          initialData={editingItem || {}}
        />
      )}
    </PageWrapper>
  );
};

export default VaccineManagement;