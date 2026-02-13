import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import allergyService from '../api/allergyService';
import medicalRecordService from '../api/medicalRecordService';
import authService from '../api/authService';

const AllergyManagement = () => {
  const [allergies, setAllergies] = useState([]);
  const [filteredAllergies, setFilteredAllergies] = useState([]);
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
    fetchAllergies();
    fetchMedicalRecords();
  }, []);

  // Filter allergies when selection changes
  useEffect(() => {
    if (selectedMedicalRecord === '') {
      setFilteredAllergies(allergies);
    } else {
      const filtered = allergies.filter(
        allergy => allergy.medicalRecordId === parseInt(selectedMedicalRecord)
      );
      setFilteredAllergies(filtered);
    }
  }, [selectedMedicalRecord, allergies]);

  const fetchAllergies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await allergyService.getAllAllergies();
      setAllergies(data);
      setFilteredAllergies(data);
    } catch (err) {
      setError('Greška pri učitavanju alergija');
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
    { key: 'childName', label: 'Dete' },
    { key: 'type', label: 'Tip alergije' },
    { key: 'description', label: 'Opis' },
    { 
      key: 'severity', 
      label: 'Ozbiljnost',
      render: (val) => {
        const colors = {
          'MILD': { bg: '#d1fae5', color: '#065f46' },
          'MODERATE': { bg: '#fef3c7', color: '#92400e' },
          'SEVERE': { bg: '#fee2e2', color: '#991b1b' }
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
            {val}
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
    { 
      name: 'type', 
      label: 'Tip alergije', 
      type: 'select',
      required: true,
      options: [
        { value: 'FOOD', label: 'Hrana' },
        { value: 'MEDICATION', label: 'Lekovi' },
        { value: 'ENVIRONMENTAL', label: 'Okruženje' },
        { value: 'OTHER', label: 'Ostalo' }
      ]
    },
    { name: 'description', label: 'Opis', type: 'textarea', required: true, fullWidth: true },
    { 
      name: 'severity', 
      label: 'Ozbiljnost', 
      type: 'select',
      required: true,
      options: [
        { value: 'MILD', label: 'Blaga' },
        { value: 'MODERATE', label: 'Umerena' },
        { value: 'SEVERE', label: 'Ozbiljna' }
      ]
    }
  ];

  const handleSubmit = async (data) => {
    try {
      const allergyData = {
        ...data,
        medicalRecordId: parseInt(data.medicalRecordId)
      };

      if (editingItem) {
        await allergyService.updateAllergy(editingItem.id, allergyData);
      } else {
        await allergyService.createAllergy(allergyData);
      }

      await fetchAllergies();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Greška pri čuvanju alergije');
      }
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovu alergiju?')) {
      return;
    }

    try {
      await allergyService.deleteAllergy(id);
      await fetchAllergies();
    } catch (err) {
      setError('Greška pri brisanju alergije');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Alergije">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
          <div style={{ color: '#6b7280' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Alergije" 
      onAdd={
        isNurse
          ? () => {
              setEditingItem(null);
              setIsModalOpen(true);
            }
          : null
      }
      addButtonText={isNurse ? 'Dodaj Alergiju' : null}
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
        data={filteredAllergies} 
        onEdit={
          isNurse
            ? (item) => {
                setEditingItem(item);
                setIsModalOpen(true);
              }
            : null
        }
        onDelete={isNurse ? handleDelete : null}
      />
      
      {isNurse && (
        <FormModal
          title={editingItem ? 'Izmeni Alergiju' : 'Dodaj Novu Alergiju'}
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

export default AllergyManagement;