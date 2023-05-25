export interface Person {
  id: number;
  name: string;
  birthday: string;
  cpf: string;
  sex: string;
  city: string | null;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;
  created_at: string;
  updated_at: string;
}

export interface Protocol {
  id: number;
  description: string;
  deadline: number;
  person_id: number;
  created_at: string;
  updated_at: string;
  person: Person;
}

export interface HeaderProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
  searchText: string;
  handleSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder: string;
  handleSearch: () => void;
  btnEnabled: boolean;
  handleLogout: () => void;
}

export interface PersonFormErrors {
  name?: string[];
  birthday?: string[];
  cpf?: string[];
  sex?: string[];
}

export interface ProtocolFormErrors {
  description?: string[];
  deadline?: string[];
  person_id?: string[];
}
