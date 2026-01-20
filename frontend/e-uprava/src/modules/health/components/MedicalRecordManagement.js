export const MedicalRecordManagement = () => {
  const [records, setRecords] = useState([
    { 
      id: 1, 
      childId: 1, 
      childName: 'Marko', 
      childSurname: 'Marković', 
      parentContact: '0641234567',
      lastCheck: '2025-01-10',
      canJoinTheCollective: true
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'childId', label: 'ID Deteta' },
    { key: 'childName', label: 'Ime' },
    { key: 'childSurname', label: 'Prezime' },
    { key: 'parentContact', label: 'Kontakt roditelja' },
    { key: 'lastCheck', label: 'Poslednji pregled' },
    { 
      key: 'canJoinTheCollective', 
      label: 'Može u kolektiv',
      render: (val) => val ? '✅ Da' : '❌ Ne'
    }
  ];

  const fields = [
    { name: 'childId', label: 'ID Deteta', type: 'number', required: true },
    { name: 'childName', label: 'Ime deteta', required: true },
    { name: 'childSurname', label: 'Prezime deteta', required: true },
    { name: 'parentContact', label: 'Kontakt roditelja', required: true },
    { name: 'lastCheck', label: 'Datum poslednjeg pregleda', type: 'datetime-local', required: true },
    { name: 'canJoinTheCollective', label: 'Može u kolektiv', type: 'checkbox' }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setRecords(records.map(r => r.id === editingItem.id ? { ...data, id: editingItem.id } : r));
    } else {
      setRecords([...records, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Zdravstveni Kartoni</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Karton
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={records} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati karton?') && setRecords(records.filter(r => r.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Karton' : 'Dodaj Karton'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};