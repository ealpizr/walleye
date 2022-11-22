import type {
  RNPDigitalInmueblesResponse,
  RNPDigitalMuebleDetalleResponse,
  RNPDigitalMueblesResponse,
  RNPDigitalPersonasInmueblesResponse,
} from "./rnp";

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

export interface RNPLevantamiento {
  fechaLevantamiento: string;
  numeroBoleta: string;
  descripcionAutoridadJudicial: string;
}

export interface RNPFinca {
  canton: string;
  derecho: string;
  distrito: string;
  provincia: string;
  medida: string;
  numero: string;
}

export interface RNPInmueble {
  name: string;
  fincas: RNPFinca[];
}

export interface RNPMueble {
  placa: string;
  fechaInscripcion: string;
  montoValorHacienda: string;
  descripcionCodigoBien: string;
  descripcionEstilo: string;
  descripcionColor: string;
  descripcionMarca: string;
  levantamientos: RNPLevantamiento[];
}

export interface RNPData {
  inmuebles: RNPInmueble[];
  muebles: RNPMueble[];
}

export type {
  RNPDigitalPersonasInmueblesResponse,
  RNPDigitalInmueblesResponse,
  RNPDigitalMueblesResponse,
  RNPDigitalMuebleDetalleResponse,
};
