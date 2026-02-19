import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import healthNotificationsService from '../api/healthNotificationsService';

const HealthNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await healthNotificationsService.getAllNotifications();
      setNotifications(data);
    } catch (err) {
      setError('Greška pri učitavanju obaveštenja');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (val) => {
    if (!val) return '-';
    const date = new Date(val);
    return date.toLocaleDateString('sr-RS');
  };

  const columns = [
    { key: 'title', label: 'Naslov' },
    {
      key: 'text',
      label: 'Tekst',
      render: (text) => text.substring(0, 50) + (text.length > 50 ? '...' : '')
    },
    { key: 'publishedAt', label: 'Objavljeno', render: (val) => formatDate(val) },
    { key: 'visibleTo', label: 'Vidljivo do', render: (val) => formatDate(val) },
  ];

  const fields = [
    { name: 'title', label: 'Naslov', required: true, fullWidth: true },
    { name: 'text', label: 'Tekst', type: 'textarea', required: true, fullWidth: true },
    { name: 'visibleTo', label: 'Vidljivo do', type: 'date', required: true }
  ];

  const handleSubmit = async (data) => {
    try {
      const preparedData = {
        ...data,
        visibleTo: `${data.visibleTo}T00:00:00`
      };

      await healthNotificationsService.createNotification(preparedData);
      await fetchNotifications();
      setIsModalOpen(false);
    } catch (err) {
      setError('Greška pri kreiranju obaveštenja');
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Obaveštenja">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Obaveštenja"
      onAdd={() => setIsModalOpen(true)}
      addButtonText="Dodaj Obaveštenje"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">
            ✕
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={notifications}
        onEdit={null}
        onDelete={null}
      />

      <FormModal
        title="Dodaj Novo Obaveštenje"
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={{}}
      />
    </PageWrapper>
  );
};

export default HealthNotifications;