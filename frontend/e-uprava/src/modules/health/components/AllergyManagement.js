import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import allergyService from '../../services/allergyService';

const AllergyManagement = () => {
  const [allergies, setAllergies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllergies();
  }, []);

  const fetchAllergies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await allergyService.getAllAllergies();
      setAllergies(data);
    } catch (err) {
      setError('Greška pri učitavanju alergija');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { 
      key: 'type', 
      label: 'Tip',
      render: (val) => {
        const labels = {
          'FOOD': 'Hrana',
          'MEDICATION': 'Lek',
          'ENVIRONMENTAL': 'Okolina',
          'OTHER': 'Ostalo'
        };
        return labels[val] || val;
      }
    },
    { key: 'description', label: 'Opis' }, 
    { 
      key: 'severity', 
      label: 'Ozbiljnost',
      render: (val) => {
        const colors = {
          'LOW': 'bg-green-100 text-green-800',
          'MEDIUM': 'bg-yellow-100 text-yellow-800',
          'HIGH': 'bg-red-100 text-red-800'
        };
        const labels = {
          'LOW': 'Niska',
          'MEDIUM': 'Srednja',
          'HIGH': 'Visoka'
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
    { 
      name: 'type', 
      label: 'Tip alergije', 
      type: 'select', 
      required: true,
      options: [
        { value: 'FOOD', label: 'Hrana' },
        { value: 'MEDICATION', label: 'Lek' },
        { value: 'ENVIRONMENTAL', label: 'Okolina' },
        { value: 'OTHER', label: 'Ostalo' }
      ]
    },
    { name: 'description', label: 'Opis alergije', type: 'textarea', required: true, fullWidth: true },
    { 
      name: 'severity', 
      label: 'Ozbiljnost', 
      type: 'select', 
      required: true,
      options: [
        { value: 'LOW', label: 'Niska' },
        { value: 'MEDIUM', label: 'Srednja' },
        { value: 'HIGH', label: 'Visoka' }
      ]
    }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await allergyService.updateAllergy(editingItem.id, data);
      } else {
        await allergyService.createAllergy(data);
      }
      await fetchAllergies();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju alergije');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu alergiju?')) {
      try {
        await allergyService.deleteAllergy(id);
        await fetchAllergies();
      } catch (err) {
        setError('Greška pri brisanju alergije');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Alergije">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Alergije" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Alergiju"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={allergies} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Alergiju' : 'Dodaj Novu Alergiju'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default AllergyManagement;