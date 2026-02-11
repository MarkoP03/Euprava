import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import notificationService from '../api/notificationService';
import authService from '../api/authService';

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setIsAdmin(user?.role === 'ADMIN');
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAllNotifications();
      setNotifications(data);
    } catch (err) {
      setError('Greška pri učitavanju obaveštenja');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Naslov' },
    { 
      key: 'text', 
      label: 'Tekst', 
      render: (text) =>
        text.substring(0, 50) + (text.length > 50 ? '...' : '') 
    },
    { key: 'publishedAt', label: 'Objavljeno', render: (val) => formatBirthDate(val) },
    { key: 'visibleTo', label: 'Vidljivo do', render: (val) => formatBirthDate(val) },
  ];

  const fields = [
    { name: 'title', label: 'Naslov', required: true, fullWidth: true },
    { name: 'text', label: 'Tekst', type: 'textarea', required: true, fullWidth: true },
    { name: 'visibleTo', label: 'Vidljivo do', type: 'date', required: true }
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
        visibleTo: `${data.visibleTo}T00:00:00`
      };

      if (editingItem) {
        await notificationService.updateNotification(editingItem.id, preparedData);
      } else {
        await notificationService.createNotification(preparedData);
      }

      await fetchNotifications();

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju obaveštenja');
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovo obaveštenje?')) {
      return;
    }

    try {
      await notificationService.deleteNotification(id);
      await fetchNotifications();
    } catch (err) {
      setError('Greška pri brisanju obaveštenja');
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
      onAdd={
        isAdmin
          ? () => {
              setEditingItem(null);
              setIsModalOpen(true);
            }
          : null
      }
      addButtonText={isAdmin ? 'Dodaj Obaveštenje' : null}
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={notifications}
        
        onEdit={
          isAdmin
            ? (item) => {
                setEditingItem({
                  ...item,
                  visibleTo: formatDateForInput(item.visibleTo)
                });
                setIsModalOpen(true);
              }
            : null 
        }

        onDelete={isAdmin ? handleDelete : null}
      />

      {isAdmin && (
        <FormModal
          title={editingItem ? 'Izmeni Obaveštenje' : 'Dodaj Novo Obaveštenje'}
          fields={fields}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
          initialData={editingItem || {}}
        />
      )}
    </PageWrapper>
  );
};

export default NotificationsManagement;
