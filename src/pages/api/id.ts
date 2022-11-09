import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { isNumber, Override, parseParams } from "../../utils";

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

const requestEndpoint =
  "https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx";
const resultEndpoint =
  "https://servicioselectorales.tse.go.cr/chc/resultado_persona.aspx";

const id = async (req: Request, res: NextApiResponse) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      message: "query is required",
    });
  }

  if (!isNumber(query) || query.length > 9) {
    return res.status(400).json({
      message: "id is invalid",
    });
  }

  const getCookie = await fetch(requestEndpoint);
  const sessionCookie = getCookie.headers.get("set-cookie") || "";

  const params = {
    __VIEWSTATE:
      "/wEPDwULLTE1OTIyMjMwMDVkZGf0hlOpAN/BhOLq3iF0Kb+QcNbXnKtj9cz9G/QSHoS3",
    __EVENTVALIDATION:
      "/wEdAAlhsepm4eRCbhEZmiY4Hi6/tTfNpOz0CH4vKngBfzxDIS2hNtLCXCKq92TKMjYS4CX24YOX6Ab2AoRRJXYcN6RPZrHMfDaOuX2c5DuODJSeiypYaPycT+v9uchEvEhJB0tWvoSmUD9cccAzkkmmOR9zkJ/OtIbU04qfUHmBu0NaRFCfQQ61frM+tUgerGfangYS2N04UlIFa4rVghzY4oGplT9A52lAlbeWWbDkW1aVjw==",
    __ASYNCPOST: "true",
    btnConsultaCedula: "Consultar",
    txtcedula: query,
  };

  await fetch(requestEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams(params),
  });

  const response = await fetch(resultEndpoint, {
    headers: {
      Cookie: sessionCookie,
    },
  });
  const root = parse(await response.text());

  res.json({
    id: root.getElementById("lblcedula")?.innerText,
    name: root.getElementById("lblnombrecompleto")?.innerText,
    dateOfBirth: root.getElementById("lblfechaNacimiento")?.innerText,
    age: root.getElementById("lbledad")?.innerText,
    deceased: root.getElementById("lbldefuncion2")?.innerText !== "",
  });
};

export default id;
