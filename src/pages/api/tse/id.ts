import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import type { TSEData } from "../../../types";
import type { Override } from "../../../utils";
import { isValidID, parseParams } from "../../../utils";
import {
  TSE_ID_QUERY_URL,
  TSE_SINGLE_RESULT_URL,
} from "../../../utils/constants";

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

const id = async (
  req: Request,
  res: NextApiResponse<TSEData | { message: string }>
) => {
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

  const getCookie = await fetch(TSE_ID_QUERY_URL);
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

  await fetch(TSE_ID_QUERY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams(params),
  });

  let response = await fetch(TSE_SINGLE_RESULT_URL, {
    headers: {
      Cookie: sessionCookie,
    },
  });
  const root = parse(await response.text());

  response = await fetch(TSE_SINGLE_RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE:
        "/wEPDwULLTE1NTg5MDEzMzIPZBYCAgUPZBYKAg0PZBYCZg9kFiYCAw8PFgQeBFRleHQFJVNPTElDSVRBUiBDRVJUSUZJQ0FDSU9OIERFIE1BVFJJTU9OSU8eB1Rvb2xUaXAFJVNPTElDSVRBUiBDRVJUSUZJQ0FDSU9OIERFIE1BVFJJTU9OSU9kZAIJDw8WAh4HVmlzaWJsZWhkZAINDw8WAh8CaGRkAhMPDxYCHwAFCTEwMjgwMDY3MmRkAhcPDxYCHwAFCjEzLzA5LzE5NDBkZAIbDw8WAh8ABRRPU0NBUiBBUklBUyAgU0FOQ0hFWmRkAh8PDxYCHwAFDUNPU1RBUlJJQ0VOU0VkZAIjDw8WAh8ABQEgZGQCJw8PFgIfAAUIODIgQcORT1NkZAIrDw8WAh8ABRFKVUFOIFJBRkFFTCBBUklBU2RkAi8PDxYCHwAFAk5PZGQCMw8PFgIfAAUBMGRkAjsPDxYCHwAFD0xJTExJQU0gU0FOQ0hFWmRkAkEPDxYCHwAFATBkZAJDDw8WAh8ABQhDQVNBRE8vQWRkAkUPDxYCHwAFATJkZAJJDw8WAh8AZWRkAk0PDxYCHwAFCU1BU0NVTElOT2RkAk8PDxYCHwBlZGQCHw8PFgIfAGVkZAInD2QWAmYPZBYCAgMPPCsAEQIBEBYAFgAWAAwUKwAAZAIpD2QWAmYPZBYCAgMPPCsAEQIBEBYAFgAWAAwUKwAAZAIrD2QWAmYPZBYCAgMPPCsAEQIBEBYAFgAWAAwUKwAAZBgEBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBAULSW1hZ2VJbmljaW8FE0ltYWdlQ29uc3VsdGFDZWR1bGEFE0ltYWdlQ29uc3VsdGFOb21icmUFCkltYWdlU2FsaXIFDEdyaWR2b3RhY2lvbg9nZAUPR3JpZG1hdHJpbW9uaW9zD2dkBQlHcmlkaGlqb3MPZ2RqqTnz5OmfEctuMdwy1LYWtUJ0+PjMOvCe0vdnNTSsDw==",
      __EVENTVALIDATION:
        "/wEdABFv9odfY/ybx2DW2JE2QBf3iqbymbVNf9U++jDqKpBZeKfpigIS2tjkEVbbLpJMXRKuK+c1zGEqN0QiOtSVIjbTo8XTvMemOeiTsiCv52YIemVikE++yEdoHTLugZV7sMg9MKWwyYnyGaRupuuiPjUTpRd+w+p8QgmIF/xj83k64/we9+BwVz5Ihp+bC78EPFMCfHJxCCGkqx0cEcFZIWbctTfNpOz0CH4vKngBfzxDIS2hNtLCXCKq92TKMjYS4CX24YOX6Ab2AoRRJXYcN6RPb/5cgUWoPLK9FRe9Wehz9MYrrw85uciTs0i4KdeN/lBd3VPD6Wym8us3eHD1WYbKZrHMfDaOuX2c5DuODJSei02WSE5Vu47J1rzLM6MMWQ4uITXT3xLGIsE/l/TutLJu",
      __ASYNCPOST: "true",
      btnMostrarNacimiento: "Mostrar",
    }),
  });

  const childrenRoot = parse(await response.text());
  const children = Array.from(childrenRoot.querySelectorAll("#Gridhijos > tr"))
    .slice(1)
    .map((row) => {
      return Array.from(row.childNodes)
        .map((col) => {
          return col.innerText;
        })
        .slice(2, -1);
    })
    .map((child) => {
      return {
        id: child[0],
        name: child[2],
        dateOfBirth: child[1],
      };
    });

  const data = {
    id: root.getElementById("lblcedula")?.innerText,
    name: root.getElementById("lblnombrecompleto")?.innerText,
    dateOfBirth: root.getElementById("lblfechaNacimiento")?.innerText,
    age: root.getElementById("lbledad")?.innerText,
    deceased: root.getElementById("lbldefuncion2")?.innerText !== "",
    father: {
      id: root.getElementById("lblnombremadre")?.innerText || "",
      name: root.getElementById("lblid_padre")?.innerText || "",
    },
    mother: {
      id: root.getElementById("lblid_madre")?.innerText || "",
      name: root.getElementById("lblnombremadre")?.innerText || "",
    },
    children: children,
  };

  if (!data.id) {
    return res.status(404).json({ message: "no records found" });
  }

  return res.status(200).json(data);
};

export default id;
