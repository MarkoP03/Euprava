export const AllergyManagement = () => {
  const [allergies, setAllergies] = useState([
    { id: 1, medicalRecordId: 1, type: 'FOOD', description: 'Kikiriki', severity: 'HIGH' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'type', label: 'Tip' },
    { key: 'description', label: 'Opis' },
    { key: 'severity', label: 'Ozbiljnost' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { 
      name: 'type', 
      label: 'Tip alergije', 
      type: 'select', 
      required: true,
      options: [
        { value: 'FOOD', label: 'Hrana' },
        { value: 'MEDICATION', label: 'Lek' },
        { value: 'ENVIRONMENTAL', label: 'Okolina' },
        { value: 'OTHER', label: 'Ostalo' }
      ]
    },
    { name: 'description', label: 'Opis alergije', type: 'textarea', required: true, fullWidth: true },
    { 
      name: 'severity', 
      label: 'Ozbiljnost', 
      type: 'select', 
      required: true,
      options: [
        { value: 'LOW', label: 'Niska' },
        { value: 'MEDIUM', label: 'Srednja' },
        { value: 'HIGH', label: 'Visoka' }
      ]
    }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setAllergies(allergies.map(a => a.id === editingItem.id ? { ...data, id: editingItem.id } : a));
    } else {
      setAllergies([...allergies, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Alergijama</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Alergiju
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={allergies} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati alergiju?') && setAllergies(allergies.filter(a => a.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Alergiju' : 'Dodaj Alergiju'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};