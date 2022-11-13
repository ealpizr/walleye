export interface TSEData {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  idExpiration?: string;
  deceased: boolean;
  father: {
    id: string;
    name: string;
  };
  mother: {
    id: string;
    name: string;
  };
  children: {
    id: string;
    name: string;
    dateOfBirth: string;
  }[];
  marriages: {
    date: string;
    type: string;
  }[];
}

export interface ErrorResponse {
  message?: string;
}

export interface MHData {
  regimen: string;
  status: string;
  inDebt: boolean;
  hasIgnoredDeclarations: true;
  activities: {
    status: string;
    code: string;
    name: string;
  }[];
}

export interface CCSSData {
  asegurado: string;
}
