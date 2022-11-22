interface XMLSchemaDateTime {
  XMLSchemaType: {
    localPart: string;
    namespaceURI: string;
    prefix: string;
  };
  day: number;
  eon: number;
  eonAndYear: number;
  fractionalSecond: number;
  hour: number;
  millisecond: number;
  minute: number;
  month: number;
  second: number;
  timezone: number;
  valid: boolean;
  year: number;
}

export interface RNPDigitalPersonasInmueblesResponse {
  success: boolean;
  data: {
    consecIdent: number;
    estadoCivil: string;
    identFormat: string;
    labelIdent: string;
    nombre: string;
    numIdent: string;
    tipoIdent: number;
  }[];
}

export interface RNPDigitalInmueblesResponse {
  success: boolean;
  data: {
    cedula: string;
    consecIdent: number;
    fincas: {
      canton: string;
      derecho: number;
      derechoFormat: string;
      distrito: string;
      duplicado: string;
      fusion: string;
      horizontal: string;
      isTomo: boolean;
      labelProvincia: string;
      medida: number;
      numero: number;
      provincia: number;
    }[];
    personas: [];
    source: string;
    tipoIdent: number;
    totalPersonas: number;
  };
}

export interface RNPDigitalMueblesResponse {
  success: boolean;
  data: {
    codigoNacionalidad: string;
    codigoTipoIdentificacion: string;
    derechos: {
      codigoBien: string;
      codigoCausaAdquisicion: string;
      codigoClaseBien: string;
      codigoEstadoCivil: string;
      codigoTipoBien: string;
      codigoTipoDerecho: string;
      codigoTipoIdentificacion: string;
      codigoUsuario: string;
      direccion: string;
      fechaAdquisicion: XMLSchemaDateTime;
      fechaConstitucion: XMLSchemaDateTime;
      historicoDerecho: [];
      numeroAsientoAdqusicion: string;
      numeroBien: string;
      numeroConsecutivoIdentificacion: string;
      numeroDerecho: string;
      numeroIdentificacion: string;
      numeroProporcion1: number;
      numeroProporcion2: number;
      numeroSecuenciaAdquisicion: string;
      numeroTomoAdquisicion: string;
      timestamp: XMLSchemaDateTime;
      tipoCausaAdquisitiva: {
        codigoCausaadquisitiva: string;
        codigoTipoTabla: string;
        descripcionCausaAdquisitiva: string;
        descripcionCorta: string;
        indicadorHabilitado: string;
      };
      tipoDerecho: {
        codigoTipoDerecho: string;
        codigoTipoTabla: string;
        descripcionCorta: string;
        descripcionTipoDerecho: string;
        indicadorHabilitado: string;
      };
      tipoEstadoCivil: {
        codigoEstadoCivil: string;
        codigoTipoTabla: string;
        descripcionCorta: string;
        descripcionEstadoCivil: string;
        indicadorHabilitado: string;
      };
    }[];
    historicoDerecho: [];
    indice: number;
    nombre: string;
    numeroConsecutivoIdentificacion: string;
    numeroContador: number;
    numeroIdentificacion: string;
    numeroIndicadorHistorial: string;
    primerApellido: string;
    restoJuridico: string;
    segundoApellido: string;
    tieneBienMueble: boolean;
    tieneGravamen: boolean;
    timestamp: XMLSchemaDateTime;
    tipoIdentificacion: {
      codigoTipoIdentificacion: string;
      codigoTipoTabla: string;
      descripcionTipoIdentificacion: string;
    };
    tipoNacionalidad: {
      codigoTipoNacionalidad: string;
      codigoTipoTabla: string;
      descripcionCorta: string;
      descripcionNacionalidad: string;
      indicadorHabilitado: string;
    };
    visitado: string;
  }[];
}

export interface RNPDigitalMuebleDetalleResponse {
  success: boolean;
  data: {
    cedulaFisicaPrimeraParte: string;
    cedulaFisicaSegundaParte: string;
    cedulaFisicaTerceraParte: string;
    derechos: {
      bienMueble: {
        codigoBien: string;
        codigoCitasAnteriores: string;
        codigoClaseBien: string;
        codigoEstadoActual: string;
        codigoEstadoTributario: string;
        codigoMoneda: string;
        codigoTipoBien: string;
        codigoUso: string;
        codigoUsuario: string;
        fechaInscripcion: string;
        fechaUltimoMovimiento: string;
        montoValorContrato: number;
        montoValorHacienda: number;
        numeroAsientoInscripcion: string;
        numeroAsientoUltimoMovimiento: string;
        numeroBien: string;
        numeroIdentificacionAnterior: string;
        numeroRegistral: number;
        numeroSecuenciaInscripcion: string;
        numeroSecuenciaUltimoMovimiento: string;
        numeroTomoInscripcion: string;
        numeroTomoUltimoMovimiento: string;
        timestamp: Date;
        tipoActividad: {
          codigoTipoActividad: string;
          codigoTipoTabla: string;
          descripcionTipoActividad: string;
          indicadorHabilitado: string;
        };
        tipoBien: {
          codigo: string;
          descripcionCodigo: string;
          indicadorHabilitado: string;
          timestamp: Date;
        };
        tipoCodigo: {
          claseBien: string;
          codigoBien: string;
          descripcionCodigoBien: string;
          descripcionCorta: string;
          indicadorHabilitado: string;
          tipoBien: string;
          ultimoConsecutivo: number;
        };
        tipoEstado: {
          codigoEstadoActual: string;
          codigoTipoTabla: string;
          descripcionCorta: string;
          descripcionEstadoActual: string;
          indicadorHabilitado: string;
        };
        tipoEstadoTributario: {
          codigoEstadoTributario: string;
          codigoTipoTabla: string;
          descripcionCorta: string;
          descripcionEstadoTributario: string;
          indicadorHabilitado: string;
        };
        tipoMoneda: {
          codigoMoneda: string;
          codigoTipoTabla: string;
          descripcionMoneda: string;
        };
        tipoUso: {
          codigoTipoTabla: string;
          codigoUso: string;
          descripcionCorta: string;
          descripcionUso: string;
          indicadorHabilitado: string;
        };
        tipoclase: {
          claseBien: string;
          codigoTipoBien: string;
          descripcionClaseBien: string;
        };
        valorFiscal: {
          codigoBien: string;
          codigoClaseBien: string;
          codigoTipoBien: string;
          montoValorHacienda: number;
          numeroBien: string;
          numeroClaseTributaria: number;
          timestamp: Date;
        };
        valorHaciendaTwo: number;
        vehiculo: {
          codigoBien: string;
          codigoCarroceria: string;
          codigoCategoria: string;
          codigoClaseBien: string;
          codigoColor: string;
          codigoIndicadorConvertido: string;
          codigoIndicadorRefaccionado: string;
          codigoMarca: string;
          codigoTipoBien: string;
          codigoTipoCabina: string;
          codigoTipoTecho: string;
          codigoTraccion: string;
          descripcionEstilo: string;
          descripcionTipo: string;
          motores: {
            codigoBien: string;
            codigoClaseBien: string;
            codigoCombustible: string;
            codigoMarca: string;
            codigoProcedencia: string;
            codigoTipoBien: string;
            numeroBien: string;
            numeroCilindrada: number;
            numeroCilindros: number;
            numeroMotor: string;
            numeroPotencia: number;
            timestamp: Date;
            tipoCombustible: {
              codigoCombustible: string;
              codigoTipoTabla: string;
              descripcionCombustible: string;
              descripcionCorta: string;
              indicadorHabilitado: string;
            };
            tipoMarca: {
              codigoMarca: string;
              codigoTipoTabla: string;
              descripcionCorta: string;
              descripcionMarca: string;
              indicadorHabilitado: string;
            };
            tipoProcedencia: {
              codigoProcedencia: string;
              codigoTipoTabla: string;
              descripcionCorta: string;
              descripcionProcedencia: string;
              indicadorHabilitado: string;
            };
          }[];
          numeroAgnoFabricacion: number;
          numeroBien: string;
          numeroCapacidad: number;
          numeroChasis: string;
          numeroClaseTributaria: number;
          numeroEjes: number;
          numeroLongitud: number;
          numeroPesoBruto: number;
          numeroPesoNeto: number;
          numeroPesoRemolque: number;
          numeroPesoVacio: number;
          timestamp: Date;
          tipoBienMueble: {
            codigoTipoBien: string;
            descripcionTipoBien: string;
          };
          tipoCabina: {
            codigoTipoCabina: string;
            codigoTipoTabla: string;
            descripcionCorta: string;
            descripcionTipoCabina: string;
            indicadorHabilitado: string;
          };
          tipoCarroceria: {
            codigoCarroceria: string;
            codigoTipoTabla: string;
            descripcionCarroceria: string;
            descripcionCorta: string;
            indicadorHabilitado: string;
          };
          tipoCategoria: {
            codigoCategoria: string;
            codigoTipoTabla: string;
            descripcionCategoria: string;
            descripcionCorta: string;
            indicadorHabilitado: string;
          };
          tipoClaseBien: {
            codigoClaseBien: string;
            codigoTipoBien: string;
            codigoTipoTabla: string;
            descripcionClaseBien: string;
            indicadorHabilitado: string;
          };
          tipoCodigoBien: {
            codigoBien: string;
            codigoClaseBien: string;
            codigoTipoBien: string;
            codigoTipoTabla: string;
            descripcionCodigoBien: string;
            descripcionCorta: string;
            indicadorHabilitado: string;
            numeroUltimoConsecutivo: number;
          };
          tipoColor: {
            codigoColor: string;
            codigoTipoTabla: string;
            descripcionColor: string;
            descripcionCorta: string;
            indicadorHabilitado: string;
          };
          tipoMarca: {
            codigoMarca: string;
            codigoTipoTabla: string;
            descripcionCorta: string;
            descripcionMarca: string;
            indicadorHabilitado: string;
          };
          tipoTecho: {
            codigoTipoTabla: string;
            codigoTipoTecho: string;
            descripcionCorta: string;
            descripcionTipoTecho: string;
            indicadorHabilitado: string;
          };
          tipoTraccion: {
            codigoTipoTabla: string;
            codigoTraccion: string;
            descripcionCorta: string;
            descripcionTraccion: string;
            indicadorHabilitado: string;
          };
          levantamientos: {
            codigoAutoridadJudicial: string;
            codigoBien: string;
            codigoClaseBien: string;
            codigoTipoBien: string;
            codigoUsuario: string;
            descripcionAutoridadJudicial: string;
            fechaLevantamiento: Date;
            fechaRegistro: Date;
            horaLevantamiento: Date;
            horaRegistro: Date;
            numeroBien: string;
            numeroBoleta: string;
            numeroImagen: number;
            numeroImagenLevantamiento: number;
            numeroRollo: number;
            numeroRolloLevantamiento: number;
            numeroSumaria: string;
            timestamp: Date;
          }[];
        }[];
      };
      codigoBien: string;
      codigoCausaAdquisicion: string;
      codigoClaseBien: string;
      codigoEstadoCivil: string;
      codigoTipoBien: string;
      codigoTipoDerecho: string;
      codigoTipoIdentificacion: string;
      codigoUsuario: string;
      direccion: string;
      fechaAdquisicion: string;
      fechaConstitucion: string;
      numeroAsientoAdqusicion: string;
      numeroBien: string;
      numeroConsecutivoIdentificacion: string;
      numeroDerecho: string;
      numeroIdentificacion: string;
      numeroProporcion1: number;
      numeroProporcion2: number;
      numeroSecuenciaAdquisicion: string;
      numeroTomoAdquisicion: string;
      persona: {
        codigoNacionalidad: string;
        codigoTipoIdentificacion: string;
        nombre: string;
        numeroConsecutivoIdentificacion: string;
        numeroContador: number;
        numeroIdentificacion: string;
        numeroIndicadorHistorial: string;
        primerApellido: string;
        restoJuridico: string;
        segundoApellido: string;
        tieneBienMueble: boolean;
        tieneGravamen: boolean;
        timestamp: Date;
        tipoIdentificacion: {
          codigoTipoIdentificacion: string;
          codigoTipoTabla: string;
          descripcionTipoIdentificacion: string;
        };
        tipoNacionalidad: {
          codigoTipoNacionalidad: string;
          codigoTipoTabla: string;
          descripcionCorta: string;
          descripcionNacionalidad: string;
          indicadorHabilitado: string;
        };
      };
      timestamp: Date;
      tipoCausaAdquisitiva: {
        codigoCausaadquisitiva: string;
        codigoTipoTabla: string;
        descripcionCausaAdquisitiva: string;
        descripcionCorta: string;
        indicadorHabilitado: string;
      };
      tipoDerecho: {
        codigoTipoDerecho: string;
        codigoTipoTabla: string;
        descripcionCorta: string;
        descripcionTipoDerecho: string;
        indicadorHabilitado: string;
      };
      tipoEstadoCivil: {
        codigoEstadoCivil: string;
        codigoTipoTabla: string;
        descripcionCorta: string;
        descripcionEstadoCivil: string;
        indicadorHabilitado: string;
      };
    }[];
    forward: string;
    globalBienMueble: {
      numeroRegistral: number;
      tipoActividad: [];
      tipoBien: [];
      tipoCodigo: [];
      tipoEstado: [];
      tipoEstadoTributario: [];
      tipoMoneda: [];
      tipoUso: [];
      tipoclase: [];
      valorFiscal: {
        numeroClaseTributaria: number;
      };
    };
    globalBuque: [];
    globalDerecho: {
      numeroProporcion1: number;
      numeroProporcion2: number;
    };
    globalGarantia: [];
    globalGravamen: [];
    globalInfraccion: [];
    globalMotor: {
      numeroCilindrada: number;
      numeroCilindros: number;
    };
    globalParteGravamen: [];
    globalTitle: string;
    globalvehiculo: {
      numeroAgnoFabricacion: number;
      numeroCapacidad: number;
      numeroClaseTributaria: number;
      numeroEjes: number;
      numeroLongitud: number;
      numeroPesoBruto: number;
      numeroPesoNeto: number;
      numeroPesoRemolque: number;
      numeroPesoVacio: number;
    };
    parametro: {
      nombre: string;
      valor: string;
    };
    tipoIdentificacion: string;
  };
}
