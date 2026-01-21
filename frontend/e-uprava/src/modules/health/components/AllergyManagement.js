import React, { useState } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';

const AllergyManagement = () => {
  const [allergies, setAllergies] = useState([
    { id: 1, medicalRecordId: 1, type: 'FOOD', description: 'Kikiriki', severity: 'HIGH' }
  ]);
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleSubmit = (data) => {
    if (editingItem) {
      setAllergies(allergies.map(a => a.id === editingItem.id ? { ...data, id: editingItem.id } : a));
    } else {
      setAllergies([...allergies, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu alergiju?')) {
      setAllergies(allergies.filter(a => a.id !== id));
    }
  };

  return (
    <PageWrapper 
      title="Alergije" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Alergiju"
    >
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