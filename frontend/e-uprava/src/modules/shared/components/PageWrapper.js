import React from 'react';
import { Plus } from 'lucide-react';

const PageWrapper = ({ title, children, onAdd, addButtonText = "Dodaj" }) => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">Upravljanje i pregled podataka</p>
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          {addButtonText}
        </button>
      )}
    </div>

    {/* Content */}
    {children}
  </div>
);

export default PageWrapper;