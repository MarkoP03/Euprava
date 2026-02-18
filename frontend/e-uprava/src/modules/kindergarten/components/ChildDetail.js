import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import childService from '../api/childService';

const InfoCard = ({ label, value }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '14px 18px',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    border: '1px solid #E5E7EB'
  }}>
    <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </span>
    <span style={{ fontSize: 15, fontWeight: 500, color: '#111827' }}>
      {value || '—'}
    </span>
  </div>
);

const SectionHeader = ({ title, onAdd, addLabel }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '2px solid #E5E7EB'
  }}>
    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', margin: 0 }}>{title}</h2>
    {onAdd && (
      <button
        onClick={onAdd}
        style={{
          padding: '8px 18px',
          backgroundColor: '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600
        }}
      >
        + {addLabel}
      </button>
    )}
  </div>
);

const formatDate = (val) => {
  if (!val) return '—';
  if (Array.isArray(val)) {
    const [year, month, day] = val;
    return new Date(year, month - 1, day).toLocaleDateString('sr-RS');
  }
  if (typeof val === 'string') {
    return new Date(val).toLocaleDateString('sr-RS');
  }
  return '—';
};

const ChildDetail = () => {
  const { childId } = useParams();
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [illnessReports, setIllnessReports] = useState([]);
  const [isIllnessModalOpen, setIsIllnessModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [childId]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [childData, allergyData, illnessData] = await Promise.all([
        childService.getChildById(childId),
        childService.getAllergiesByChild(childId),
        childService.getIllnessReportsByChild(childId)
      ]);
      setChild(childData);
      setAllergies(allergyData);
      setIllnessReports(illnessData);
    } catch (err) {
      setError('Greška pri učitavanju podataka o detetu');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

    
    const allergyTypeMap = {
        FOOD: 'Hrana',
        MEDICATION: 'Lek',
        ENVIRONMENTAL: 'Okruženje',
        INSECT: 'Insekti',
        OTHER: 'Ostalo'
    };


  
  const allergyColumns = [
    {
        key: 'type',
        label: 'Tip alergije',
        render: (val) => allergyTypeMap[val] || val
    },
    { key: 'description', label: 'Opis' },
    { 
      key: 'severity', 
      label: 'Ozbiljnost',
      render: (val) => {
        const colors = {
          'MILD': { bg: '#d1fae5', color: '#065f46' },
          'MODERATE': { bg: '#fef3c7', color: '#92400e' },
          'SEVERE': { bg: '#fee2e2', color: '#991b1b' }
        };
        const style = colors[val] || { bg: '#f3f4f6', color: '#1f2937' };
        return (
          <span style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: style.bg,
            color: style.color
          }}>
            {val}
          </span>
        );
      }
    }
  ];


  
  const illnessColumns = [
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'PENDING': { bg: '#fef3c7', color: '#92400e' },
          'IN_PROGRESS': { bg: '#dbeafe', color: '#1e40af' },
          'ANSWERED': { bg: '#d1fae5', color: '#065f46' },
          'CLOSED': { bg: '#00361a', color: '#ffffff' }
        };
        const labels = {
          'PENDING': 'Na čekanju',
          'IN_PROGRESS': 'U obradi',
          'ANSWERED': 'Odgovoreno',
          'CLOSED': 'Zatvoreno'
        };
        const style = colors[val] || { bg: '#f3f4f6', color: '#1f2937' };
        return (
          <span style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: style.bg,
            color: style.color
          }}>
            {labels[val] || val}
          </span>
        );
      }
    },
    
    {
      key: 'answer',
      label: 'Odgovor lekara',
      render: (text) => text ? (
        <details style={{ cursor: 'pointer' }}>
          <summary>
            {text.substring(0, 40)}
            {text.length > 40 ? '…' : ''}
          </summary>
          <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>
            {text}
          </div>
        </details>
      ) : (
        <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
          Nema odgovora
        </span>
      )
    },

    { key: 'problem', label: 'Problem', render: (text) => text.substring(0, 40) + (text.length > 40 ? '...' : '') },
    { 
      key: 'urgent', 
      label: 'Hitno', 
      render: (val) => val ? (
        <span style={{
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          backgroundColor: '#fee2e2',
          color: '#991b1b'
        }}>
          🚨 Hitno
        </span>
      ) : 'Ne'
    }
  ];

  const illnessFields = [
    
    { name: 'problem', label: 'Opis problema', type: 'textarea', required: true, fullWidth: true },
    { name: 'urgent', label: 'Hitno', type: 'checkbox' }
  ];

  const handleIllnessSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        urgent: data.urgent ?? false
      };

      await childService.createIllnessReport(childId, payload);
      await fetchAll();
      setIsIllnessModalOpen(false);
    } catch (err) {
      setError('Greška pri dodavanju prijave bolesti');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Detalji deteta">
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Učitavanje...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={child ? `${child.name} ${child.surname}` : 'Detalji deteta'}>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
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
          ← Nazad
        </button>
      </div>

      {error && (
        <div style={{
          marginBottom: 20,
          padding: 16,
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          borderRadius: 8,
          color: '#991B1B',
          position: 'relative'
        }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Informacije o detetu ── */}
      {child && (
        <>
          <SectionHeader title="Informacije o detetu" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <InfoCard label="JMBG" value={child.jmbg} />
            <InfoCard label="Ime" value={child.name} />
            <InfoCard label="Prezime" value={child.surname} />
            <InfoCard label="Datum rođenja" value={formatDate(child.birthDate)} />
            <InfoCard label="Ime roditelja" value={child.parentName} />
            <InfoCard label="Prezime roditelja" value={child.parentSurname} />
            <InfoCard label="Kontakt roditelja" value={child.parentContact} />
            <InfoCard label="Kreirano" value={formatDate(child.createdAt)} />
          </div>
        </>
      )}

      {/* ── Alergije ── */}
      <SectionHeader title="Alergije" />
      <DataTable columns={allergyColumns} data={allergies} />

      {/* ── Prijave bolesti ── */}
      <SectionHeader
        title="Prijave bolesti"
        onAdd={() => setIsIllnessModalOpen(true)}
        addLabel="Dodaj prijavu"
      />
      <DataTable columns={illnessColumns} data={illnessReports} />

      <FormModal
        title="Dodaj prijavu bolesti"
        fields={illnessFields}
        isOpen={isIllnessModalOpen}
        onClose={() => setIsIllnessModalOpen(false)}
        onSubmit={handleIllnessSubmit}
        initialData={{}}
      />
    </PageWrapper>
  );
};

export default ChildDetail;