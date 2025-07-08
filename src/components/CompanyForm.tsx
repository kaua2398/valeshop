import React, { useState } from 'react';
import { Building, FileText, AlertCircle } from 'lucide-react';
import { CompanyData } from '../types/FormTypes';

interface CompanyFormProps {
  companyData: CompanyData;
  onCompanyDataChange: (data: CompanyData) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ companyData, onCompanyDataChange }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    const newData = { ...companyData, [field]: value };
    onCompanyDataChange(newData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateCNPJ = (cnpj: string): boolean => {
    // Remove non-numeric characters
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.length === 14;
  };

  const formatCNPJ = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 14) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatContrato = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 12) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{4})(\d{2})(\d{2})/, '$1.$2.$3.$4/$5');
    }
    return value;
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Building className="w-6 h-6 text-blue-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dados da Empresa</h2>
          <p className="text-sm text-gray-600">Informações obrigatórias para geração do arquivo CSV</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-700">
            Razão Social <span className="text-red-500">*</span>
          </label>
          <input
            id="razaoSocial"
            type="text"
            value={companyData.razaoSocial}
            onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
            placeholder="Nome da empresa"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.razaoSocial ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.razaoSocial && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.razaoSocial}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
            CNPJ <span className="text-red-500">*</span>
          </label>
          <input
            id="cnpj"
            type="text"
            value={companyData.cnpj}
            onChange={(e) => {
              const formatted = formatCNPJ(e.target.value);
              handleInputChange('cnpj', formatted);
            }}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cnpj ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cnpj && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.cnpj}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="numeroContrato" className="block text-sm font-medium text-gray-700">
            Número do Contrato <span className="text-red-500">*</span>
          </label>
          <input
            id="numeroContrato"
            type="text"
            value={companyData.numeroContrato}
            onChange={(e) => {
              const formatted = formatContrato(e.target.value);
              handleInputChange('numeroContrato', formatted);
            }}
            placeholder="000.000.0000.00/00"
            maxLength={17}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.numeroContrato ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.numeroContrato && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.numeroContrato}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;