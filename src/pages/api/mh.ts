import type { NextApiRequest, NextApiResponse } from "next";
import type { Override } from "../../utils";
import { isValidID } from "../../utils";

const MH_API_URL = "https://api.hacienda.go.cr/fe/ae";

interface MHAPIResponse {
  nombre: string;
  regimen: {
    codigo: string;
    descripcion: string;
  };
  situacion: {
    moroso: string;
    omiso: string;
    estado: string;
    administracionTributaria: string;
    mensaje: string;
  };
  actividades: {
    estado: string;
    codigo: string;
    descripcion: string;
  }[];
}

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

interface Response {
  regimen: string;
  status: string;
  inDebt: boolean;
  hasIgnoredDeclarations: boolean;
  activities: {
    status: string;
    code: string;
    name: string;
  }[];
}

type APIResponse = Response | { message: string };

const mh = async (req: Request, res: NextApiResponse<APIResponse>) => {
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

  const response = await fetch(
    `${MH_API_URL}?${new URLSearchParams({
      identificacion: query,
    })}`
  );

  if (response.status === 404) {
    return res.status(404).json({ message: "no records found" });
  }

  if (response.status !== 200) {
    return res.status(500).json({ message: "something wrong happened" });
  }

  const body = (await response.json()) as MHAPIResponse;

  res.status(200).json({
    regimen: body.regimen.descripcion,
    status: body.situacion.estado === "Inscrito" ? "Active" : "Inactive",
    inDebt: body.situacion.moroso === "SI",
    hasIgnoredDeclarations: body.situacion.omiso === "SI",
    activities: body.actividades.map((a) => {
      return {
        status: a.estado === "A" ? "Active" : "Inactive",
        code: a.codigo,
        name: a.descripcion,
      };
    }),
  });
};

export default mh;
