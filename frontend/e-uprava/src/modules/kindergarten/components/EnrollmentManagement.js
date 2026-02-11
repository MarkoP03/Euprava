import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import PageWrapper from '../../shared/components/PageWrapper';
import enrollmentService from '../api/enrollmentService';

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentService.getAllEnrollments();
      setEnrollments(data);
    } catch (err) {
      setError('Greška pri učitavanju upisa');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      key: 'childName', 
      label: 'Ime deteta',
      render: (val, row) => `${val} ${row.childSurname}`
    },
    { 
      key: 'kindergartenName', 
      label: 'Vrtić'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const styles = {
          WAITING: { bg: '#FEF3C7', color: '#92400E', label: 'Na čekanju' },
          APPROVED: { bg: '#DCFCE7', color: '#166534', label: 'Odobreno' },
          REJECTED: { bg: '#FEE2E2', color: '#991B1B', label: 'Odbijeno' }
        };

        const style = styles[val] || {
          bg: '#E5E7EB',
          color: '#374151',
          label: val
        };

        return (
          <span
            style={{
              backgroundColor: style.bg,
              color: style.color,
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            {style.label}
          </span>
        );
      }
    },
    { 
      key: 'confirmationHealthId', 
      label: 'ID Zdravstvene Potvrde',
      render: (val) => val ? val : '—'
    }
  ];

  if (loading) {
    return (
      <PageWrapper title="Upisi">
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
    <PageWrapper title="Upisi">
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
        data={enrollments}
      />
    </PageWrapper>
  );
};

export default EnrollmentManagement;