import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import userService from '../api/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Greška pri učitavanju korisnika');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Ime' },
    { key: 'surname', label: 'Prezime' },
    { 
      key: 'role', 
      label: 'Uloga',
      render: (val) => {
        const labels = {
          'ADMIN': 'Administrator',
          'TEACHER': 'Vaspitač',
          'PARENT': 'Roditelj'
        };
        return labels[val] || val;
      }
    },
    { key: 'username', label: 'Korisničko ime' },
    { key: 'email', label: 'Email' }
  ];

  const fields = [
    { name: 'name', label: 'Ime', required: true },
    { name: 'surname', label: 'Prezime', required: true },
    { 
      name: 'role', 
      label: 'Uloga', 
      type: 'select', 
      required: true,
      options: [
        { value: 'ADMIN', label: 'Administrator' },
        { value: 'TEACHER', label: 'Vaspitač' },
        { value: 'PARENT', label: 'Roditelj' }
      ]
    },
    { name: 'username', label: 'Korisničko ime', required: true },
    { name: 'password', label: 'Lozinka', type: 'password', required: !editingItem },
    { name: 'email', label: 'Email', type: 'email', required: true }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await userService.updateUser(editingItem.id, data);
      } else {
        await userService.createUser(data);
      }
      await fetchUsers();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju korisnika');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      try {
        await userService.deleteUser(id);
        await fetchUsers();
      } catch (err) {
        setError('Greška pri brisanju korisnika');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Korisnici">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper 
      title="Korisnici" 
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Korisnika"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={users} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Korisnika' : 'Dodaj Novog Korisnika'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default UserManagement;