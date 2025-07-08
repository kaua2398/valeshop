import React, { useState } from 'react';
import { FormConfig, FormData } from '../types/FormTypes';
import { Plus, AlertCircle } from 'lucide-react';

interface FormComponentProps {
  config: FormConfig;
  onAddRecord: (data: FormData) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ config, onAddRecord }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    config.fields.forEach(field => {
      const value = formData[field.name];
      
      if (field.required && (!value || value.toString().trim() === '')) {
        newErrors[field.name] = `${field.label} é obrigatório`;
      } else if (value && field.maxLength && value.toString().length > field.maxLength) {
        newErrors[field.name] = `${field.label} deve ter no máximo ${field.maxLength} caracteres`;
      } else if (field.name === 'cpf' && value && !/^\d{11}$/.test(value.toString())) {
        newErrors[field.name] = 'CPF deve ter 11 dígitos';
      } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
        newErrors[field.name] = 'E-mail deve ter um formato válido';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddRecord(formData);
      setFormData({});
    }
  };

  const renderField = (field: any) => {
    const hasError = errors[field.name];
    
    return (
      <div key={field.name} className="space-y-2">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'select' ? (
          <select
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione...</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            type={field.type === 'currency' ? 'number' : field.type === 'date' ? 'date' : field.type}
            value={field.type === 'date' && formData[field.name] ? 
              // Convert DD/MM/YYYY back to YYYY-MM-DD for date input
              (() => {
                const dateStr = formData[field.name] as string;
                if (dateStr.includes('/')) {
                  const [day, month, year] = dateStr.split('/');
                  if (day && month && year && year.length === 4) {
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                  }
                }
                return '';
              })() : 
              formData[field.name] || ''
            }
            onChange={(e) => {
              let value = e.target.value;
              // Format date fields to DD/MM/YYYY
              if (field.type === 'date' && value) {
                // Only convert if it's a valid date format from HTML input
                if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  const [year, month, day] = value.split('-');
                  value = `${day}/${month}/${year}`;
                }
              }
              handleInputChange(field.name, value);
            }}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            step={field.type === 'currency' ? '0.01' : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
        
        {hasError && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {hasError}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.fields.map(renderField)}
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Registro
        </button>
      </div>
    </form>
  );
};

export default FormComponent;