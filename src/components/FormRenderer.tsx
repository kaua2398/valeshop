import React, { useState } from 'react';
import { useEffect } from 'react';
import { FormType, FormData, CompanyData } from '../types/FormTypes';
import { formConfigs } from '../data/formConfigs';
import FormComponent from './FormComponent';
import DataPreview from './DataPreview';
import FileUpload from './FileUpload';
import CompanyForm from './CompanyForm';
import DownloadMessage from './DownloadMessage';
import { Download, FileText } from 'lucide-react';

interface FormRendererProps {
  activeForm: FormType;
}

const FormRenderer: React.FC<FormRendererProps> = ({ activeForm }) => {
  const [records, setRecords] = useState<FormData[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData>({
    razaoSocial: '',
    cnpj: '',
    numeroContrato: ''
  });
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);
  const [lastDownloadedFile, setLastDownloadedFile] = useState('');
  const config = formConfigs[activeForm];

  // Auto-clear data when component mounts or form changes
  useEffect(() => {
    setRecords([]);
    setShowDownloadMessage(false);
  }, [activeForm]);

  // Auto-clear data on page load/refresh
  useEffect(() => {
    setRecords([]);
    setShowDownloadMessage(false);
  }, []);

  const handleAddRecord = (data: FormData) => {
    setRecords([...records, data]);
  };

  const handleRemoveRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const handleDataImported = (importedData: FormData[]) => {
    setRecords(prevRecords => [...prevRecords, ...importedData]);
  };

  const handleClearAll = () => {
    setRecords([]);
    setShowDownloadMessage(false);
  };

  const validateCompanyData = (): boolean => {
    return companyData.razaoSocial.trim() !== '' && 
           companyData.cnpj.trim() !== '' && 
           companyData.numeroContrato.trim() !== '';
  };

  const generateCSV = () => {
    if (records.length === 0) {
      alert('Nenhum registro para exportar');
      return;
    }

    if (!validateCompanyData()) {
      alert('Por favor, preencha todos os dados da empresa antes de gerar o CSV');
      return;
    }

    // Create CSV content with proper formatting
    const csvRows: string[] = [];
    
    records.forEach(record => {
      const row: string[] = [];
      
      config.fields.forEach(field => {
        let value = record[field.name] || '';
        value = String(value).trim();
        
        // Handle CSV escaping for semicolon separator
        if (value.includes(';') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        
        row.push(value);
      });
      
      csvRows.push(row.join(';'));
    });
    
    const csvContent = csvRows.join('\n');

    // Generate filename with contract number and current date
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const contractFormatted = companyData.numeroContrato.replace(/\D/g, '');
    const fileName = `${config.formCode}-contrato_${contractFormatted}/${year}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    
    // Show download message
    setLastDownloadedFile(fileName);
    setShowDownloadMessage(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <CompanyForm 
        companyData={companyData}
        onCompanyDataChange={setCompanyData}
      />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600 mt-1">{config.description}</p>
          </div>
        </div>

        <FormComponent
          config={config}
          onAddRecord={handleAddRecord}
        />
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <FileUpload
            config={config}
            onDataImported={handleDataImported}
          />
        </div>
      </div>

      {records.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Pré-visualização dos Dados
              </h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    {records.length} registro{records.length !== 1 ? 's' : ''} adicionado{records.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Pronto para exportar CSV
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                Limpar Tudo
              </button>
              <button
                onClick={generateCSV}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Gerar e Baixar CSV
              </button>
            </div>
          </div>

          <DataPreview
            records={records}
            config={config}
            onRemoveRecord={handleRemoveRecord}
          />
        </div>
      )}

      {/* Summary Card - Always visible */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-3 ${records.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Status do Formulário</h3>
              <p className="text-sm text-gray-600">
                {records.length === 0 
                  ? 'Nenhum registro adicionado ainda' 
                  : `${records.length} registro${records.length !== 1 ? 's' : ''} pronto${records.length !== 1 ? 's' : ''} para exportação`
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{records.length}</div>
            <div className="text-xs text-gray-500">registros</div>
          </div>
        </div>
        
        {records.length > 0 && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="text-xs text-gray-600">
              <strong>Último adicionado:</strong> {new Date().toLocaleString('pt-BR')}
            </div>
          </div>
        )}
      </div>
      
      <DownloadMessage
        isVisible={showDownloadMessage}
        onClose={() => setShowDownloadMessage(false)}
        companyData={companyData}
        fileName={lastDownloadedFile}
      />
    </div>
  );
};

export default FormRenderer;