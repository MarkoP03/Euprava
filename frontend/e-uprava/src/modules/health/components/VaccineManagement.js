export const VaccineManagement = () => {
  const [vaccines, setVaccines] = useState([
    { id: 1, medicalRecordId: 1, name: 'MMR', date: '2024-06-15', note: 'Bez reakcija' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'name', label: 'Naziv vakcine' },
    { key: 'date', label: 'Datum' },
    { key: 'note', label: 'Napomena' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'name', label: 'Naziv vakcine', required: true },
    { name: 'date', label: 'Datum vakcinacije', type: 'datetime-local', required: true },
    { name: 'note', label: 'Napomena', type: 'textarea', fullWidth: true }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setVaccines(vaccines.map(v => v.id === editingItem.id ? { ...data, id: editingItem.id } : v));
    } else {
      setVaccines([...vaccines, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Vakcinama</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Vakcinu
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={vaccines} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati vakcinu?') && setVaccines(vaccines.filter(v => v.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Vakcinu' : 'Dodaj Vakcinu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};