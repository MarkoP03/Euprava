export const ReportOfIllnessManagement = () => {
  const [reports, setReports] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      status: 'PENDING', 
      problem: 'Temperatura 38.5°C', 
      answer: '',
      urgent: true
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'status', label: 'Status' },
    { key: 'problem', label: 'Problem' },
    { key: 'urgent', label: 'Hitno', render: (val) => val ? '🚨 Da' : 'Ne' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: [
        { value: 'PENDING', label: 'Na čekanju' },
        { value: 'IN_PROGRESS', label: 'U obradi' },
        { value: 'RESOLVED', label: 'Rešeno' }
      ]
    },
    { name: 'problem', label: 'Opis problema', type: 'textarea', required: true, fullWidth: true },
    { name: 'answer', label: 'Odgovor lekara', type: 'textarea', fullWidth: true },
    { name: 'urgent', label: 'Hitno', type: 'checkbox' }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setReports(reports.map(r => r.id === editingItem.id ? { ...data, id: editingItem.id } : r));
    } else {
      setReports([...reports, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Prijave Bolesti</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Prijavu
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={reports} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati prijavu?') && setReports(reports.filter(r => r.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Prijavu' : 'Dodaj Prijavu'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};