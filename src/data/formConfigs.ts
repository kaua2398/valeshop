import { FormConfig, FormType } from '../types/FormTypes';

export const formConfigs: Record<FormType, FormConfig> = {
  'cadastrar-usuario': {
    title: 'Planilha para Cadastro dos Dados do Usuário',
    description: 'Formulário para inclusão de novos beneficiários com seus dados pessoais completos.',
    formCode: 'cadastrar_usuario/dados_pessoais',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'telefone', label: 'DDD/Telefone', type: 'text', required: true, placeholder: '61990909090' },
      { name: 'email', label: 'E-mail do Beneficiário', type: 'email', required: true, placeholder: 'exemplo@email.com' },
      { name: 'nascimento', label: 'Data de Nascimento', type: 'date', required: true },
      { name: 'nomeMae', label: 'Nome da Mãe', type: 'text', required: true, maxLength: 21, placeholder: 'Maria da Silva Santos' }
    ],
    csvHeaders: ['CPF', 'Nome Completo', 'DDD/Telefone', 'E-mail do Beneficiário', 'Data de Nascimento', 'Nome da Mãe']
  },
  'credito-cadastro-usuario': {
    title: 'Planilha Crédito em Cartão e Cadastro de Usuário',
    description: 'Permite cadastrar um novo usuário e, simultaneamente, aplicar um crédito inicial.',
    formCode: 'credito_cadastro_usuario',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'valor', label: 'Valor de Crédito', type: 'currency', required: true, placeholder: '100.00' },
      { name: 'departamento', label: 'Nome do Depto/C. Custo', type: 'text', required: false, maxLength: 30, placeholder: 'RECURSOS HUMANOS' }
    ],
    csvHeaders: ['CPF', 'Nome Completo', 'Valor de Crédito', 'Nome do Depto/C. Custo']
  },
  'novo-usuario-credito': {
    title: 'Planilha Novo Usuário e Novo Crédito',
    description: 'Formulário para registrar um novo usuário e associar um crédito.',
    formCode: 'novo_usuario_credito',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'valor', label: 'Valor de Crédito', type: 'currency', required: true, placeholder: '100.00' },
      { name: 'departamento', label: 'Nome do Depto/C. Custo', type: 'text', required: false, maxLength: 30, placeholder: 'RECURSOS HUMANOS' }
    ],
    csvHeaders: ['CPF', 'Nome Completo', 'Valor de Crédito', 'Nome do Depto/C. Custo']
  },
  'alterar-dados-bancarios': {
    title: 'Cadastro/Alterar de Dados Bancários',
    description: 'Seção para cadastrar ou atualizar as informações bancárias de um usuário.',
    formCode: 'alterar_dados_bancarios',
    fields: [
      { name: 'banco', label: 'Número do Banco', type: 'text', required: true, placeholder: '143' },
      { name: 'agencia', label: 'Número da Agência', type: 'text', required: true, placeholder: '1234' },
      { name: 'digitoAgencia', label: 'Dígito da Agência', type: 'text', required: true, placeholder: '1' },
      { name: 'conta', label: 'Número da Conta', type: 'text', required: true, placeholder: '000123456' },
      { name: 'digitoConta', label: 'Dígito da Conta', type: 'text', required: true, placeholder: '1' }
    ],
    csvHeaders: ['Número do Banco', 'Número da Agência', 'Dígito da Agência', 'Número da Conta', 'Dígito da Conta']
  },
  'alterar-referencia': {
    title: 'Planilha Alterar Referência',
    description: 'Permite associar ou alterar o departamento (centro de custo) de um usuário existente.',
    formCode: 'alterar_referencia',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'departamento', label: 'Nome do Depto/C. Custo', type: 'text', required: false, maxLength: 30, placeholder: 'RECURSOS HUMANOS' }
    ],
    csvHeaders: ['CPF', 'Nome do Depto/C. Custo']
  },
  'alterar-matricula': {
    title: 'Alteração Matrícula do Usuário',
    description: 'Formulário para modificar o número de matrícula (CPF) de um usuário.',
    formCode: 'alterar_matricula',
    fields: [
      { name: 'matriculaAnterior', label: 'Matrícula Anterior (CPF)', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'matriculaNova', label: 'Matrícula Nova (CPF)', type: 'text', required: true, maxLength: 11, placeholder: '12345678901' }
    ],
    csvHeaders: ['Matrícula Anterior', 'Matrícula Nova']
  },
  'alterar-status-cartao': {
    title: 'Altera Status Cartão',
    description: 'Utilizado para alterar o status de um cartão (por exemplo, Ativar, Bloquear, Cancelar).',
    formCode: 'alterar_status_cartao',
    fields: [
      { name: 'cpf', label: 'Matrícula (CPF)', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'status', label: 'Novo Status', type: 'select', required: true, options: [
        { value: 'ativar', label: 'Ativar' },
        { value: 'bloquear', label: 'Bloquear' },
        { value: 'cancelar', label: 'Cancelar' },
        { value: 'inativar', label: 'Inativar' }
      ]}
    ],
    csvHeaders: ['Matrícula (CPF)', 'Nome Completo', 'Status']
  },
  'cadastrar-referencia': {
    title: 'Planilha Cadastro de Referência',
    description: 'Formulário para cadastro de um novo departamento ou centro de custo.',
    formCode: 'cadastrar_referencia',
    fields: [
      { name: 'departamento', label: 'Nome do Depto/C. Custo', type: 'text', required: false, maxLength: 30, placeholder: 'RECURSOS HUMANOS' }
    ],
    csvHeaders: ['Nome do Depto/C. Custo']
  },
  'credito-cartao': {
    title: 'Planilha para Crédito de Valores para Cartão',
    description: 'Realiza a aplicação de créditos no cartão de um usuário existente.',
    formCode: 'credito_cartao',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'valor', label: 'Valor de Crédito', type: 'currency', required: true, placeholder: '100.00' },
      { name: 'departamento', label: 'Nome do Depto/C. Custo', type: 'text', required: false, maxLength: 30, placeholder: 'RECURSOS HUMANOS' }
    ],
    csvHeaders: ['CPF', 'Nome Completo', 'Valor de Crédito', 'Nome do Depto/C. Custo']
  },
  'debito-cartao': {
    title: 'Planilha Débito de Valores para Cartão',
    description: 'Efetua o estorno de valores do cartão de um usuário.',
    formCode: 'debito_cartao',
    fields: [
      { name: 'cpf', label: 'CPF', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Completo', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'valor', label: 'Valor de Estorno', type: 'currency', required: true, placeholder: '100.00' }
    ],
    csvHeaders: ['CPF', 'Nome Completo', 'Valor de Estorno']
  },
  'cadastro-veiculo': {
    title: 'Planilha para Cadastro de Veículo',
    description: 'Formulário para o registro de novos veículos na frota.',
    formCode: 'cadastro_veiculo',
    fields: [
      { name: 'renavam', label: 'RENAVAM', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'placa', label: 'Placa', type: 'text', required: true, maxLength: 7, placeholder: 'OVW1254' },
      { name: 'chassi', label: 'Chassi', type: 'text', required: true, maxLength: 17, placeholder: '1HGCM82633A123456' },
      { name: 'anoFabricacao', label: 'Ano Fabricação', type: 'text', required: true, placeholder: '1990' },
      { name: 'idModelo', label: 'ID Modelo Veículo', type: 'select', required: true, options: [
        { value: '179', label: 'ACCELO' },
        { value: '943', label: 'CIVIC' },
        { value: '256', label: 'COROLLA' },
        { value: '789', label: 'HILUX' }
      ]}
    ],
    csvHeaders: ['RENAVAM', 'Placa', 'Chassi', 'Ano Fabricação', 'ID Modelo Veículo']
  },
  'cadastro-motorista': {
    title: 'Planilha para Cadastro de Motorista',
    description: 'Cadastra os dados de um novo motorista, incluindo informações da CNH.',
    formCode: 'cadastro_motorista',
    fields: [
      { name: 'matricula', label: 'Matrícula', type: 'text', required: true, placeholder: '12345678900' },
      { name: 'nome', label: 'Nome Motorista', type: 'text', required: true, placeholder: 'João da Silva Santos' },
      { name: 'cpf', label: 'CPF do Motorista', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'validadeCnh', label: 'Data de Validade da CNH', type: 'date', required: true },
      { name: 'numeroCnh', label: 'Número CNH', type: 'text', required: true, maxLength: 11, placeholder: '12345678900' },
      { name: 'categoriaCnh', label: 'Categoria CNH', type: 'select', required: true, options: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'E', label: 'E' },
        { value: 'AB', label: 'AB' },
        { value: 'AC', label: 'AC' },
        { value: 'AD', label: 'AD' },
        { value: 'AE', label: 'AE' }
      ]}
    ],
    csvHeaders: ['Matrícula', 'Nome Motorista', 'CPF', 'Data Validade CNH', 'Número CNH', 'Categoria CNH']
  }
};