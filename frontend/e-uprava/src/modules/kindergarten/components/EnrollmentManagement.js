import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([
    { id: 1, childId: 1, kindergartenId: 1, status: 'PENDING', confirmationHealthId: null }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'childId', label: 'ID Deteta' },
    { key: 'kindergartenId', label: 'ID Vrtića' },
    { key: 'status', label: 'Status' },
    { key: 'confirmationHealthId', label: 'ID Potvrde' }
  ];

  const fields = [
    { name: 'childId', label: 'ID Deteta', type: 'number', required: true },
    { name: 'kindergartenId', label: 'ID Vrtića', type: 'number', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'PENDING', label: 'Na čekanju' },
        { value: 'APPROVED', label: 'Odobreno' },
        { value: 'REJECTED', label: 'Odbijeno' }
      ]
    },
    { name: 'confirmationHealthId', label: 'ID Zdravstvene Potvrde', type: 'number' }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setEnrollments(enrollments.map(e => e.id === editingItem.id ? { ...data, id: editingItem.id } : e));
    } else {
      setEnrollments([...enrollments, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Upisima</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Upis
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={enrollments} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => window.confirm('Obrisati upis?') && setEnrollments(enrollments.filter(e => e.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Upis' : 'Dodaj Upis'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};

export default EnrollmentManagement;