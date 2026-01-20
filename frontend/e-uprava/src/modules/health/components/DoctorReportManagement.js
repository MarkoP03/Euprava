export const DoctorReportManagement = () => {
  const [reports, setReports] = useState([
    { 
      id: 1, 
      medicalRecordId: 1, 
      date: '2025-01-10', 
      diagnosis: 'Prehlada', 
      recommendation: 'Odmor 3 dana' 
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'medicalRecordId', label: 'ID Kartona' },
    { key: 'date', label: 'Datum' },
    { key: 'diagnosis', label: 'Dijagnoza' },
    { key: 'recommendation', label: 'Preporuka' }
  ];

  const fields = [
    { name: 'medicalRecordId', label: 'ID Zdravstvenog kartona', type: 'number', required: true },
    { name: 'date', label: 'Datum pregleda', type: 'datetime-local', required: true },
    { name: 'diagnosis', label: 'Dijagnoza', type: 'textarea', required: true, fullWidth: true },
    { name: 'recommendation', label: 'Preporuka', type: 'textarea', required: true, fullWidth: true }
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
        <h2 className="text-2xl font-bold">Lekarski Izveštaji</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Izveštaj
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={reports} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati izveštaj?') && setReports(reports.filter(r => r.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Izveštaj' : 'Dodaj Izveštaj'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};