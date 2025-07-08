import React from 'react';
import { Users, CreditCard, Car, UserCheck, Building, DollarSign, FileText, UserPlus, Settings } from 'lucide-react';
import { FormType } from '../types/FormTypes';

interface SidebarProps {
  activeForm: FormType;
  onFormChange: (form: FormType) => void;
}

const menuItems = [
  {
    category: 'Usuários e Cartões',
    icon: Users,
    items: [
      { id: 'cadastrar-usuario', label: 'Cadastrar Usuário', description: 'Dados Pessoais' },
      { id: 'credito-cadastro-usuario', label: 'Crédito e Cadastro', description: 'Usuário' },
      { id: 'novo-usuario-credito', label: 'Novo Usuário', description: 'e Novo Crédito' },
      { id: 'alterar-dados-bancarios', label: 'Alterar Dados', description: 'Bancários' },
      { id: 'alterar-referencia', label: 'Alterar Referência', description: 'do Usuário' },
      { id: 'alterar-matricula', label: 'Alterar Matrícula', description: 'do Usuário' },
      { id: 'alterar-status-cartao', label: 'Alterar Status', description: 'do Cartão' },
      { id: 'cadastrar-referencia', label: 'Cadastrar', description: 'Referência' }
    ]
  },
  {
    category: 'Operações Financeiras',
    icon: DollarSign,
    items: [
      { id: 'credito-cartao', label: 'Crédito em Cartão', description: 'Aplicar Crédito' },
      { id: 'debito-cartao', label: 'Débito em Cartão', description: 'Estorno' }
    ]
  },
  {
    category: 'Veículos e Motoristas',
    icon: Car,
    items: [
      { id: 'cadastro-veiculo', label: 'Cadastro de Veículo', description: 'Dados do Veículo' },
      { id: 'cadastro-motorista', label: 'Cadastro de Motorista', description: 'Dados da CNH' }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ activeForm, onFormChange }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Sistema de Formulários</h1>
        <p className="text-sm text-gray-600 mt-1">Gerador de CSV</p>
      </div>
      
      <nav className="p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.category}>
            <div className="flex items-center mb-3">
              <section.icon className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section.category}
              </h2>
            </div>
            
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onFormChange(item.id as FormType)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeForm === item.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;