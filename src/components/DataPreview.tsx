import React from 'react';
import { FormData, FormConfig } from '../types/FormTypes';
import { Trash2 } from 'lucide-react';

interface DataPreviewProps {
  records: FormData[];
  config: FormConfig;
  onRemoveRecord: (index: number) => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ records, config, onRemoveRecord }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {config.csvHeaders.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-900">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {config.fields.map((field, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  {record[field.name] || ''}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onRemoveRecord(index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                  title="Remover registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPreview;