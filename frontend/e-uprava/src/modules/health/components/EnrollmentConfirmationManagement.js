export const EnrollmentConfirmationManagement = () => {
  const [confirmations, setConfirmations] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      issuedAt: '2025-01-15', 
      validUntil: '2025-07-15', 
      status: 'ACTIVE' 
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'issuedAt', label: 'Izdato' },
    { key: 'validUntil', label: 'Važi do' },
    { key: 'status', label: 'Status' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'issuedAt', label: 'Datum izdavanja', type: 'datetime-local', required: true },
    { name: 'validUntil', label: 'Važi do', type: 'datetime-local', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'ACTIVE', label: 'Aktivna' },
        { value: 'EXPIRED', label: 'Istekla' },
        { value: 'REVOKED', label: 'Poništena' }
      ]
    }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setConfirmations(confirmations.map(c => c.id === editingItem.id ? { ...data, id: editingItem.id } : c));
    } else {
      setConfirmations([...confirmations, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Potvrde za Upis</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Potvrdu
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={confirmations} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati potvrdu?') && setConfirmations(confirmations.filter(c => c.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Potvrdu' : 'Dodaj Potvrdu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};