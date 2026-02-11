import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import worksService from '../api/workService';
import userService from '../api/userService';

const KindergartenEmployees = () => {
  const { kindergartenId } = useParams();
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kindergartenName, setKindergartenName] = useState('');

  useEffect(() => {
    fetchWorks();
  }, [kindergartenId]);

  // Fetch teachers only when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchTeachers();
    }
  }, [isModalOpen]);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await worksService.getWorksByKindergarten(kindergartenId);
      setWorks(data);
      if (data.length > 0) {
        setKindergartenName('Vrtić');
      }
    } catch (err) {
      setError('Greška pri učitavanju zaposlenih');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await userService.getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Greška pri učitavanju vaspitača');
    }
  };

  const columns = [
    { 
      key: 'userName', 
      label: 'Ime i Prezime',
      render: (val, row) => `${val} ${row.userSurname}`
    },
    { 
      key: 'salary', 
      label: 'Plata',
      render: (val) => `${val.toLocaleString('sr-RS')} RSD`
    },
    { 
      key: 'startDate', 
      label: 'Datum početka rada',
      render: (val) => new Date(val).toLocaleDateString('sr-RS')
    }
  ];

  const fields = [
    { 
      name: 'userId', 
      label: 'Vaspitač', 
      type: 'select',
      required: true,
      fullWidth: true,
      options: teachers.map(teacher => ({
        value: teacher.id,
        label: `${teacher.name} ${teacher.surname}`
      }))
    },
    { 
      name: 'salary', 
      label: 'Plata (RSD)', 
      type: 'number',
      required: true,
      fullWidth: true
    }
  ];

  const handleSubmit = async (data) => {
    try {
      const workData = {
        ...data,
        kindergartenId: parseInt(kindergartenId),
        userId: parseInt(data.userId),
        salary: parseInt(data.salary)
      };

      if (editingItem) {
        await worksService.updateWork(editingItem.id, workData);
      } else {
        await worksService.createWork(workData);
      }
      await fetchWorks();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Greška pri čuvanju podataka o radu');
      }
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj radni odnos?')) {
      try {
        await worksService.deleteWork(id);
        await fetchWorks();
      } catch (err) {
        setError('Greška pri brisanju radnog odnosa');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Zaposleni">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <div style={{ color: '#6b7280', fontSize: '16px' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title={`Zaposleni - ${kindergartenName}`}
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Zaposlenog"
    >
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/kindergarten/kindergartens')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Nazad na Vrtiće
        </button>
      </div>

      {error && (
        <div style={{
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          color: '#991b1b',
          position: 'relative'
        }}>
          {error}
          <button 
            onClick={() => setError(null)} 
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#991b1b'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={works} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Radni Odnos' : 'Dodaj Novog Zaposlenog'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default KindergartenEmployees;