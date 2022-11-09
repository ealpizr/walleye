export interface TSEData {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  idExpiration?: string;
  deceased: boolean;
}

export interface ErrorResponse {
  message?: string;
}
