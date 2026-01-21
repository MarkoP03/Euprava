import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';


const ChildManagement = () => {
  const [children, setChildren] = useState([
    { id: 1, jmbg: '0101010123456', name: 'Marko', surname: 'Marković', birthDate: '2019-05-15', parentName: 'Petar', parentSurname: 'Marković', parentContact: '0641234567' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  const columns = [
    { key: 'jmbg', label: 'JMBG' },
    { key: 'name', label: 'Ime' },
    { key: 'surname', label: 'Prezime' },
    { key: 'birthDate', label: 'Datum rođenja' },
    { key: 'parentName', label: 'Ime roditelja' },
    { key: 'parentContact', label: 'Kontakt' }
  ];

  const fields = [
    { name: 'jmbg', label: 'JMBG', required: true },
    { name: 'name', label: 'Ime', required: true },
    { name: 'surname', label: 'Prezime', required: true },
    { name: 'birthDate', label: 'Datum rođenja', type: 'date', required: true },
    { name: 'parentName', label: 'Ime roditelja', required: true },
    { name: 'parentSurname', label: 'Prezime roditelja', required: true },
    { name: 'parentContact', label: 'Kontakt roditelja', required: true }
  ];

  const handleSubmit = (data) => {
    if (editingChild) {
      setChildren(children.map(c => c.id === editingChild.id ? { ...data, id: editingChild.id } : c));
    } else {
      setChildren([...children, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingChild(null);
  };

  const handleEdit = (child) => {
    setEditingChild(child);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
  if (window.confirm('Da li ste sigurni da želite da obrišete ovo dete?')) {
    setChildren(children.filter(c => c.id !== id));
  }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Decom</h2>
        <button onClick={() => { setEditingChild(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Dete
        </button>
      </div>
      <DataTable columns={columns} data={children} onEdit={handleEdit} onDelete={handleDelete} />
      <FormModal
        title={editingChild ? 'Izmeni Dete' : 'Dodaj Dete'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingChild(null); }}
        onSubmit={handleSubmit}
        initialData={editingChild || {}}
      />
    </div>
  );
};


export default ChildManagement;