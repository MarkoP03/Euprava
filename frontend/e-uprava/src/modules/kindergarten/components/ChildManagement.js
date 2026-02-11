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
    { key: 'birthDate', label: 'Datum rođenja', render: (val) => formatBirthDate(val) },
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

  const formatBirthDate = (val) => {
    if (!val || !Array.isArray(val)) return '-';
    
    
    const [year, month, day] = val;
    
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('sr-RS'); // 10.5.2019
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
        birthDate: `${data.birthDate}T00:00:00`
      };

      if (editingChild) {
        await childService.updateChild(editingChild.id, preparedData);
      } else {
        await childService.createChild(preparedData);
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
        
        onEdit={
          
            (item) => {
                setEditingChild({
                  ...item,
                  birthDate: formatDateForInput(item.birthDate)
                });
                setIsModalOpen(true);
              }
            
        }
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