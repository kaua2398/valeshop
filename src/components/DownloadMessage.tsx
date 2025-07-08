import React from 'react';
import { CheckCircle, Mail, Copy } from 'lucide-react';
import { CompanyData } from '../types/FormTypes';

interface DownloadMessageProps {
  isVisible: boolean;
  onClose: () => void;
  companyData: CompanyData;
  fileName: string;
}

const DownloadMessage: React.FC<DownloadMessageProps> = ({ 
  isVisible, 
  onClose, 
  companyData, 
  fileName 
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Download Concluído!</h3>
            <p className="text-sm text-gray-600">Arquivo CSV gerado com sucesso</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-blue-900 mb-2">Próximos passos:</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>1. Localize o arquivo baixado: <strong>{fileName}</strong></p>
            <p>2. Envie o arquivo para o e-mail administrativo</p>
            <p>3. Inclua o CNPJ da empresa no e-mail</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">E-mail de destino:</span>
            <button
              onClick={() => copyToClipboard('administrativo@valeshop.com.br')}
              className="text-blue-600 hover:text-blue-800 p-1 rounded"
              title="Copiar e-mail"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-900 font-mono">administrativo@valeshop.com.br</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">CNPJ para incluir no e-mail:</span>
            <button
              onClick={() => copyToClipboard(companyData.cnpj)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded"
              title="Copiar CNPJ"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-900 font-mono">{companyData.cnpj}</span>
        </div>

        {copied && (
          <div className="mb-4 p-2 bg-green-100 border border-green-200 rounded text-sm text-green-800 text-center">
            Copiado para a área de transferência!
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadMessage;