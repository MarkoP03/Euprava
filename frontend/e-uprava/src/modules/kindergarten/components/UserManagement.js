import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import PageWrapper from '../../shared/components/PageWrapper';
import userService from '../api/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
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

  if (loading) {
    return (
      <PageWrapper title="Korisnici">
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
    <PageWrapper title="Korisnici">
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
        data={users}
      />
    </PageWrapper>
  );
};

export default UserManagement;