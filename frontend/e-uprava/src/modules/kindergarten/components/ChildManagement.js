import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import childService from '../api/childService';

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await childService.getAllChildren();
      setChildren(data);
    } catch (err) {
      setError('Greška pri učitavanju dece');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'jmbg', label: 'JMBG' },
    { key: 'name', label: 'Ime' },
    { key: 'surname', label: 'Prezime' },
    { key: 'birthDate', label: 'Datum rođenja', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { key: 'parentName', label: 'Roditelj', render: (val, row) => `${val} ${row.parentSurname}` },
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

  const handleSubmit = async (data) => {
    try {
      if (editingChild) {
        await childService.updateChild(editingChild.id, data);
      } else {
        await childService.createChild(data);
      }
      await fetchChildren();
      setIsModalOpen(false);
      setEditingChild(null);
    } catch (err) {
      setError('Greška pri čuvanju deteta');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovo dete?')) {
      try {
        await childService.deleteChild(id);
        await fetchChildren();
      } catch (err) {
        setError('Greška pri brisanju deteta');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Deca">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Deca" 
      onAdd={() => { setEditingChild(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Dete"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={children} 
        onEdit={(item) => { setEditingChild(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingChild ? 'Izmeni Dete' : 'Dodaj Novo Dete'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingChild(null); }}
        onSubmit={handleSubmit}
        initialData={editingChild || {}}
      />
    </PageWrapper>
  );
};

export default ChildManagement;