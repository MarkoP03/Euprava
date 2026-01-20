const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', surname: 'User', role: 'ADMIN', username: 'admin', email: 'admin@vrtic.rs' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { key: 'name', label: 'Ime' },
    { key: 'surname', label: 'Prezime' },
    { key: 'role', label: 'Uloga' },
    { key: 'username', label: 'Korisničko ime' },
    { key: 'email', label: 'Email' }
  ];

  const fields = [
    { name: 'name', label: 'Ime', required: true },
    { name: 'surname', label: 'Prezime', required: true },
    { 
      name: 'role', 
      label: 'Uloga', 
      type: 'select', 
      required: true,
      options: [
        { value: 'ADMIN', label: 'Administrator' },
        { value: 'TEACHER', label: 'Vaspitač' },
        { value: 'PARENT', label: 'Roditelj' }
      ]
    },
    { name: 'username', label: 'Korisničko ime', required: true },
    { name: 'password', label: 'Lozinka', type: 'password', required: !editingItem },
    { name: 'email', label: 'Email', type: 'email', required: true }
  ];

  const handleSubmit = (data) => {
    if (editingItem) {
      setUsers(users.map(u => u.id === editingItem.id ? { ...data, id: editingItem.id } : u));
    } else {
      setUsers([...users, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upravljanje Korisnicima</h2>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} /> Dodaj Korisnika
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={users} 
        onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }} 
        onDelete={(id) => confirm('Obrisati korisnika?') && setUsers(users.filter(u => u.id !== id))} 
      />
      <FormModal
        title={editingItem ? 'Izmeni Korisnika' : 'Dodaj Korisnika'}
        fields={fields}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSubmit={handleSubmit}
        initialData={editingItem || {}}
      />
    </div>
  );
};