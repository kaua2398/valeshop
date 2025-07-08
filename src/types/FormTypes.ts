export type FormType = 
  | 'cadastrar-usuario'
  | 'credito-cadastro-usuario'
  | 'novo-usuario-credito'
  | 'alterar-dados-bancarios'
  | 'alterar-referencia'
  | 'alterar-matricula'
  | 'alterar-status-cartao'
  | 'cadastrar-referencia'
  | 'credito-cartao'
  | 'debito-cartao'
  | 'cadastro-veiculo'
  | 'cadastro-motorista';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'number' | 'select' | 'currency';
  required: boolean;
  maxLength?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: string;
}

export interface FormConfig {
  title: string;
  description: string;
  fields: FormField[];
  csvHeaders: string[];
  formCode: string; // Código para usar no nome do arquivo
}

export interface CompanyData {
export interface FormData {
  [key: string]: string | number;
}
}