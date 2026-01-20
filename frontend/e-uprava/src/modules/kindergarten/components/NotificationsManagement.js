const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Obaveštenje', text: 'Test obaveštenje', publishedAt: '2025-01-15', visibleTo: '2025-02-15' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'title', label: 'Naslov' },
    { key: 'text', label: 'Tekst', render: (text) => text.substring(0, 50) + '...' },
    { key: 'publishedAt', label: 'Objavljeno' },
    { key: 'visibleTo', label: 'Vidljivo do' }
  ];

  const fields = [
    { name: 'title', label: 'Naslov', required: true, fullWidth: true },
    { name: 'text', label: 'Tekst', type: 'textarea', required: true, fullWidth: true },
    { name: 'publishedAt', label: 'Datum objavljivanja', type: 'date', required: true },
    { name: 'visibleTo', label: 'Vidljivo do', type: 'date', required: true }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setNotifications(notifications.map(n => n.id === editingItem.id ? { ...data, id: editingItem.id } : n));
    } else {
      setNotifications([...notifications, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Obaveštenjima</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Obaveštenje
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={notifications} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati obaveštenje?') && setNotifications(notifications.filter(n => n.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Obaveštenje' : 'Dodaj Obaveštenje'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};