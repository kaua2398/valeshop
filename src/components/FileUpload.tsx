import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { FormConfig, FormData } from '../types/FormTypes';

interface FileUploadProps {
  config: FormConfig;
  onDataImported: (data: FormData[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ config, onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    count?: number;
  }>({ type: null, message: '' });

  // Clear upload status when component mounts or config changes
  useEffect(() => {
    setUploadStatus({ type: null, message: '' });
    setIsProcessing(false);
  }, [config]);
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const processExcelFile = (file: File): Promise<FormData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: '', // Default value for empty cells
            raw: false // Don't use raw values, convert to strings
          });
          
          // Process all data (no header to skip since we don't expect headers)
          const processedData = processRawData(jsonData as any[][]);
          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo Excel'));
      reader.readAsArrayBuffer(file);
    });
  };

  const processCSVFile = (file: File): Promise<FormData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          try {
            // Process all data (no header to skip since we don't expect headers)
            const processedData = processRawData(results.data as any[][]);
            resolve(processedData);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => reject(error),
        skipEmptyLines: true,
        delimiter: ',', // Explicitly set comma as delimiter
        quoteChar: '"', // Handle quoted fields
        escapeChar: '"' // Handle escaped quotes
      });
    });
  };

  const processRawData = (rawData: any[][]): FormData[] => {
    const processedData: FormData[] = [];
    
    // Filter out completely empty rows first
    const filteredData = rawData.filter(row => 
      row && row.length > 0 && row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')
    );
    
    filteredData.forEach((row, index) => {
      
      const record: FormData = {};
      config.fields.forEach((field, fieldIndex) => {
        let value = '';
        
        // Safely get the value from the row
        if (row && fieldIndex < row.length && row[fieldIndex] !== null && row[fieldIndex] !== undefined) {
          value = row[fieldIndex];
        }
        
        // Convert to string and trim
        value = String(value).trim();
        
        // Handle date formatting for Excel dates
        if (field.type === 'date' && value) {
          // Check if it's an Excel serial date number
          if (!isNaN(Number(value)) && Number(value) > 40000) {
            const excelDate = XLSX.SSF.parse_date_code(Number(value));
            if (excelDate) {
              const day = String(excelDate.d).padStart(2, '0');
              const month = String(excelDate.m).padStart(2, '0');
              const year = String(excelDate.y);
              value = `${day}/${month}/${year}`;
            }
          } else if (value.includes('/') || value.includes('-')) {
            // Handle various date formats
            const dateFormats = [
              /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // DD/MM/YYYY
              /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/, // DD/MM/YY
              /^(\d{4})-(\d{1,2})-(\d{1,2})$/, // YYYY-MM-DD
              /^(\d{1,2})-(\d{1,2})-(\d{4})$/, // DD-MM-YYYY
              /^(\d{1,2})-(\d{1,2})-(\d{2})$/, // DD-MM-YY
            ];
            
            for (const format of dateFormats) {
              const match = value.match(format);
              if (match) {
                if (format === dateFormats[2]) { // YYYY-MM-DD
                  value = `${match[3].padStart(2, '0')}/${match[2].padStart(2, '0')}/${match[1]}`;
                } else if (format === dateFormats[1] || format === dateFormats[4]) { // DD/MM/YY or DD-MM-YY
                  // Convert 2-digit year to 4-digit year
                  let year = parseInt(match[3]);
                  if (year < 50) {
                    year += 2000; // 00-49 becomes 2000-2049
                  } else {
                    year += 1900; // 50-99 becomes 1950-1999
                  }
                  value = `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
                } else { // DD/MM/YYYY or DD-MM-YYYY
                  value = `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${match[3]}`;
                }
                break;
              }
            }
          }
        }
        
        record[field.name] = value;
      });
      
      // Only add record if it has at least one non-empty field
      if (Object.values(record).some(val => val !== null && val !== undefined && String(val).trim() !== '')) {
        processedData.push(record);
      }
    });
    
    return processedData;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let importedData: FormData[] = [];

      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        importedData = await processExcelFile(file);
      } else if (fileExtension === 'csv') {
        importedData = await processCSVFile(file);
      } else {
        throw new Error('Formato de arquivo não suportado. Use apenas .xlsx, .xls ou .csv');
      }

      if (importedData.length === 0) {
        throw new Error('Nenhum dado válido encontrado no arquivo');
      }

      onDataImported(importedData);
      setUploadStatus({
        type: 'success',
        message: 'Arquivo importado com sucesso!',
        count: importedData.length
      });

    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro ao processar arquivo'
      });
    } finally {
      setIsProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <FileSpreadsheet className="w-12 h-12 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Importar Dados em Lote</h3>
            <p className="text-sm text-gray-600 mt-1">
              Faça upload de um arquivo Excel (.xlsx, .xls) ou CSV para importar múltiplos registros
            </p>
          </div>
          
          <button
            onClick={handleFileSelect}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processando...' : 'Selecionar Arquivo'}
          </button>
        </div>
      </div>

      {uploadStatus.type && (
        <div className={`p-4 rounded-md ${
          uploadStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            )}
            <div>
              <p className={`text-sm font-medium ${
                uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {uploadStatus.message}
              </p>
              {uploadStatus.type === 'success' && uploadStatus.count && (
                <p className="text-sm text-green-600 mt-1">
                  {uploadStatus.count} registro{uploadStatus.count !== 1 ? 's' : ''} importado{uploadStatus.count !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Formato do Arquivo:</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <p>• <strong>NÃO inclua cabeçalhos</strong> - apenas os dados</p>
          <p>• As colunas devem estar na seguinte ordem:</p>
          <div className="ml-4 mt-2 font-mono text-xs bg-white p-2 rounded border">
            {config.csvHeaders.join(' | ')}
          </div>
          <p>• Cada linha representa um registro</p>
          <p>• Cada coluna representa um campo específico</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;