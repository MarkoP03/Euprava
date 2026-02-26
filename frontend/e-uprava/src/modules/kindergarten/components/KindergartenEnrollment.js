import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import enrollmentService from '../api/enrollmentService';
import childService from '../api/childService';

const KindergartenEnrollment = () => {
  const { kindergartenId } = useParams();
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kindergartenName, setKindergartenName] = useState('Vrtić');

  useEffect(() => {
    fetchEnrollments();
  }, [kindergartenId]);

  // fetch children only when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchChildren();
    }
  }, [isModalOpen]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentService.getEnrollmentsByKindergarten(
        kindergartenId
      );
      setEnrollments(data);

      if (data.length > 0) {
        setKindergartenName('Vrtić');
      }
    } catch (err) {
      console.error(err);
      setError('Greška pri učitavanju upisa');
    } finally {
      setLoading(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const data = await childService.getAllChildren();
      setChildren(data);
    } catch (err) {
      console.error(err);
      setError('Greška pri učitavanju dece');
    }
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        childId: parseInt(data.childId),
        kindergartenId: parseInt(kindergartenId),
        status: 'ACCEPTED',
        confirmationHealthId: null
      };

      await enrollmentService.createEnrollment(payload);
      await fetchEnrollments();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || 'Greška pri upisu deteta'
      );
    }
  };

  const columns = [
    { key: 'childName', label: 'Ime deteta' },
    { key: 'childSurname', label: 'Prezime deteta' },
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
      label: 'ID zdravstvene potvrde',
      render: (val) => (val ? val : '—')
    },
    {
      key: 'actions',
      label: 'Detalji',
      render: (_, row) => (
        <button
          onClick={() => goToChildDetail(row.childId)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          Pogledaj
        </button>
      )
    }

  ];

  const fields = [
    {
      name: 'childId',
      label: 'Dete',
      type: 'select',
      required: true,
      fullWidth: true,
      options: children.map((child) => ({
        value: child.id,
        label: `${child.name} ${child.surname}`
      }))
    }
  ];

  const goToChildDetail = (childId) => {
    navigate(`/kindergarten/children/${childId}`);
  };

  if (loading) {
    return (
      <PageWrapper title="Upisi">
        <div
          style={{
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}
        >
          Učitavanje...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={`Upisi - ${kindergartenName}`}
      onAdd={() => setIsModalOpen(true)}
      addButtonText="Upiši dete"
    >
      {/* Back */}
      <div style={{ marginBottom: 20 }}>
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
            fontWeight: 600
          }}
        >
          ← Nazad na Vrtiće
        </button>
      </div>

      {error && (
        <div
          style={{
            marginBottom: 20,
            padding: 16,
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: 8,
            color: '#991B1B',
            position: 'relative'
          }}
        >
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'none',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>
      )}

      <DataTable columns={columns} data={enrollments} />

      <FormModal
        title="Upiši dete u vrtić"
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        
      />
    </PageWrapper>
  );
};

export default KindergartenEnrollment;
