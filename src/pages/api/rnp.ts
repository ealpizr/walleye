import type { NextApiRequest, NextApiResponse } from "next";
import parse from "node-html-parser";
import { env } from "../../env/server.mjs";
import { getEncryptedPassword, getPublicKey } from "../../helpers/rnp";
import type {
  RNPData,
  RNPDigitalInmueblesResponse,
  RNPDigitalMuebleDetalleResponse,
  RNPDigitalMueblesResponse,
  RNPDigitalPersonasInmueblesResponse,
  RNPInmueble,
  RNPMueble,
} from "../../types/index.js";
import {
  isValidID,
  parseCookies,
  parseJSON,
  parseParams,
  type Override,
} from "../../utils";
import { RNPDIGITAL_API_URL } from "../../utils/constants";

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

type APIResponse = RNPData | { message: string };

const rnp = async (req: Request, res: NextApiResponse<APIResponse>) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      message: "query is required",
    });
  }

  if (!isValidID(query)) {
    return res.status(400).json({
      message: "id is invalid",
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // LOGIN
  const email = env.RNPDIGITAL_EMAIL;
  const password = env.RNPDIGITAL_PASSWORD;
  const encryptedPassword = getEncryptedPassword(
    password,
    await getPublicKey()
  );

  const loginResponse = await fetch(RNPDIGITAL_API_URL, {
    method: "POST",
    headers,
    body: parseParams({
      action: "restapiloginwp",
      email: email,
      clave: encryptedPassword,
    }),
  });

  if (loginResponse.status !== 200) {
    return res.status(400).json({
      message: "could not authenticate in rnpdigital",
    });
  }

  headers.Cookie = parseCookies(loginResponse.headers.get("set-cookie") || "");
  const tokenRequest = await fetch(
    "https://rn.rnpdigital.com/servicio/consulta-indice-de-personas-fisicas-3/",
    {
      method: "GET",
      headers,
    }
  );

  const root = parse(await tokenRequest.text());

  const commonBody = {
    token: root.getElementById("tokenRegister")?.getAttribute("value") || "",
    userid: (await parseJSON(loginResponse)).data.idUsuario,
  };

  // INMUEBLES
  const personasInmueblesResponse = await fetch(RNPDIGITAL_API_URL, {
    method: "POST",
    credentials: "include",
    headers,
    body: parseParams({
      ...commonBody,
      registro: 2,
      tipoBusqueda: 1,
      identificacion: query,
      action: "cindpf_pj_obtener_personas",
    }),
  });
  const personasInmuebles = JSON.parse(
    (await personasInmueblesResponse.text()).trim()
  ) as RNPDigitalPersonasInmueblesResponse;

  let inmuebles: RNPInmueble[] = [];
  if (personasInmuebles.success && personasInmuebles.data) {
    inmuebles = await Promise.all(
      personasInmuebles.data.map(async (p) => {
        const detalleResponse = await fetch(RNPDIGITAL_API_URL, {
          method: "POST",
          headers,
          body: parseParams({
            ...commonBody,
            registro: "2",
            tipoIdent: "1",
            numIdent: p.numIdent,
            consecIdent: p.consecIdent,
            action: "cindpf_pj_detalle_consultas",
          }),
        });
        const response = JSON.parse(
          (await detalleResponse.text()).trim()
        ) as RNPDigitalInmueblesResponse;
        return {
          name: p.nombre,
          fincas: response.data.fincas.map((f) => {
            return {
              canton: f.canton,
              derecho: f.derechoFormat,
              distrito: f.distrito,
              provincia: f.labelProvincia,
              medida: f.medida.toString(),
              numero: f.numero.toString(),
            };
          }),
        };
      })
    );
  }

  // MUEBLES
  const personasMueblesResponse = await fetch(RNPDIGITAL_API_URL, {
    method: "POST",
    headers,
    body: parseParams({
      ...commonBody,
      registro: "3",
      tipoBusqueda: "1",
      identificacion: query,
      action: "cindpf_pj_obtener_personas",
    }),
  });

  const personasMuebles = JSON.parse(
    (await personasMueblesResponse.text()).trim()
  ) as RNPDigitalMueblesResponse;

  const muebles: RNPMueble[] = [];
  if (personasMuebles.success && personasMuebles.data) {
    await Promise.all(
      personasMuebles.data.map(async (v) => {
        const detalleResponse = await fetch(RNPDIGITAL_API_URL, {
          method: "POST",
          headers,
          body: parseParams({
            ...commonBody,
            registro: "3",
            tipoidentificacion: "000001",
            cedulaPrimeraParte: query[0],
            cedulaSegundaParte: query.slice(1, 5),
            cedulaterceraParte: query.slice(5, 9),
            consecutivoiden: v.numeroConsecutivoIdentificacion,
            action: "cindpf_pj_detalle_consultas",
          }),
        });
        const response = JSON.parse(
          (await detalleResponse.text()).trim()
        ) as RNPDigitalMuebleDetalleResponse;
        response.data.derechos.forEach((d) => {
          const v = d.bienMueble;
          muebles.push({
            placa: `${v.codigoClaseBien.trim()}${v.numeroBien.replace(
              /^0+/,
              ""
            )}`,
            fechaInscripcion: v.fechaInscripcion,
            montoValorHacienda: v.montoValorHacienda.toString(),
            descripcionCodigoBien: v.tipoCodigo.descripcionCodigoBien,
            numeroAgnoFabricacion:
              v.vehiculo[0]?.numeroAgnoFabricacion.toString() || "",
            // codigoClaseBien: v.vehiculo[0]?.codigoClaseBien || "",
            numeroChasis: v.vehiculo[0]?.numeroChasis || "",
            descripcionEstilo: v.vehiculo[0]?.descripcionEstilo || "",
            descripcionColor: v.vehiculo[0]?.tipoColor.descripcionColor || "",
            descripcionMarca: v.vehiculo[0]?.tipoMarca.descripcionMarca || "",
            levantamientos:
              v.vehiculo[0]?.levantamientos?.map((l) => {
                return {
                  fechaLevantamiento: l.fechaLevantamiento.toString(),
                  numeroBoleta: l.numeroBoleta,
                  descripcionAutoridadJudicial: l.descripcionAutoridadJudicial,
                };
              }) || [],
          });
        });
      })
    );
  }

  res.send({ inmuebles, muebles });
};

export default rnp;
