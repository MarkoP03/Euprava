import React, { useState, useEffect } from 'react';
import DataTable from '../../shared/components/DataTable';
import FormModal from '../../shared/components/FormModal';
import PageWrapper from '../../shared/components/PageWrapper';
import notificationService from '../api/notificationService';

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Naslov' },
    { key: 'text', label: 'Tekst', render: (text) => text.substring(0, 50) + (text.length > 50 ? '...' : '') },
    { key: 'publishedAt', label: 'Objavljeno', render: (val) => new Date(val).toLocaleDateString('sr-RS') },
    { key: 'visibleTo', label: 'Vidljivo do', render: (val) => new Date(val).toLocaleDateString('sr-RS') }
  ];

  const fields = [
    { name: 'title', label: 'Naslov', required: true, fullWidth: true },
    { name: 'text', label: 'Tekst', type: 'textarea', required: true, fullWidth: true },
    { name: 'publishedAt', label: 'Datum objavljivanja', type: 'date', required: true },
    { name: 'visibleTo', label: 'Vidljivo do', type: 'date', required: true }
  ];

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await notificationService.updateNotification(editingItem.id, data);
      } else {
        await notificationService.createNotification(data);
      }
      await fetchNotifications();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Greška pri čuvanju obaveštenja');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovo obaveštenje?')) {
      try {
        await notificationService.deleteNotification(id);
        await fetchNotifications();
      } catch (err) {
        setError('Greška pri brisanju obaveštenja');
        console.error('Error:', err);
      }
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
      onAdd={() => { setEditingItem(null); setIsModalOpen(true); }}
      addButtonText="Dodaj Obaveštenje"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={notifications} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={handleDelete}
      />
      
      <FormModal
        title={editingItem ? 'Izmeni Obaveštenje' : 'Dodaj Novo Obaveštenje'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </PageWrapper>
  );
};

export default NotificationsManagement;