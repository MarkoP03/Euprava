const KindergartenManagement = () => {
  const [kindergartens, setKindergartens] = useState([
    { id: 1, name: 'Vrtić Radost', address: 'Kralja Petra 15', lat: 44.0165, lng: 21.0059 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'name', label: 'Naziv' },
    { key: 'address', label: 'Adresa' },
    { key: 'lat', label: 'Latitude' },
    { key: 'lng', label: 'Longitude' }
  ];

  const fields = [
    { name: 'name', label: 'Naziv vrtića', required: true, fullWidth: true },
    { name: 'address', label: 'Adresa', required: true, fullWidth: true },
    { name: 'lat', label: 'Latitude', type: 'number', step: 'any', required: true },
    { name: 'lng', label: 'Longitude', type: 'number', step: 'any', required: true }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setKindergartens(kindergartens.map(k => k.id === editingItem.id ? { ...data, id: editingItem.id } : k));
    } else {
      setKindergartens([...kindergartens, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Vrtićima</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Vrtić
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={kindergartens} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati vrtić?') && setKindergartens(kindergartens.filter(k => k.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Vrtić' : 'Dodaj Vrtić'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};