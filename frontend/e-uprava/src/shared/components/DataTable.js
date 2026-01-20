import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, X, Menu } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, onView }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              {col.label}
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
            Akcije
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <div className="flex gap-2">
                {onView && (
                  <button onClick={() => onView(row)} className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                )}
                {onEdit && (
                  <button onClick={() => onEdit(row)} className="text-green-600 hover:text-green-800">
                    <Edit2 size={18} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(row.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);