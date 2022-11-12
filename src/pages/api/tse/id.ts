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
  // VALIDATE INPUT
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

  // GET SESSION COOKIES
  const getCookie = await fetch(TSE_ID_QUERY_URL);
  const sessionCookie = getCookie.headers.get("set-cookie") || "";

  // POST QUERY
  await fetch(TSE_ID_QUERY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE:
        "/wEPDwULLTE1OTIyMjMwMDVkZGf0hlOpAN/BhOLq3iF0Kb+QcNbXnKtj9cz9G/QSHoS3",
      __EVENTVALIDATION:
        "/wEdAAlhsepm4eRCbhEZmiY4Hi6/tTfNpOz0CH4vKngBfzxDIS2hNtLCXCKq92TKMjYS4CX24YOX6Ab2AoRRJXYcN6RPZrHMfDaOuX2c5DuODJSeiypYaPycT+v9uchEvEhJB0tWvoSmUD9cccAzkkmmOR9zkJ/OtIbU04qfUHmBu0NaRFCfQQ61frM+tUgerGfangYS2N04UlIFa4rVghzY4oGplT9A52lAlbeWWbDkW1aVjw==",
      __ASYNCPOST: "true",
      btnConsultaCedula: "Consultar",
      txtcedula: query,
    }),
  });

  // GET RESULT PAGE
  let response = await fetch(TSE_SINGLE_RESULT_URL, {
    headers: {
      Cookie: sessionCookie,
    },
  });
  const root = parse(await response.text());

  // GET CHILDREN
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

  // GET MARRIAGES
  response = await fetch(TSE_SINGLE_RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE:
        "/wEPDwULLTE1NTg5MDEzMzIPZBYCAgUPZBYMAg0PZBYCZg9kFiYCAw8PFgQeBFRleHQFJVNPTElDSVRBUiBDRVJUSUZJQ0FDSU9OIERFIE1BVFJJTU9OSU8eB1Rvb2xUaXAFJVNPTElDSVRBUiBDRVJUSUZJQ0FDSU9OIERFIE1BVFJJTU9OSU9kZAIJDw8WAh4HVmlzaWJsZWhkZAINDw8WAh8CaGRkAhMPDxYCHwAFCTEwODE4MDk1N2RkAhcPDxYCHwAFCjAyLzAyLzE5NzJkZAIbDw8WAh8ABRxMT1JFTkEgTUFSSUEgUEFESUxMQSAgUk9NRVJPZGQCHw8PFgIfAAUNQ09TVEFSUklDRU5TRWRkAiMPDxYCHwAFASBkZAInDw8WAh8ABQg1MCBBw5FPU2RkAisPDxYCHwAFGlRJVE8gTElESU8gUEFESUxMQSBDT1JFTExBZGQCLw8PFgIfAAUCTk9kZAIzDw8WAh8ABQEwZGQCOw8PFgIfAAUXWk9SQUlEQSBST01FUk8gVkFMVkVSREVkZAJBDw8WAh8ABQEwZGQCQw8PFgIfAAUIQ0FTQURPL0FkZAJFDw8WAh8ABQEyZGQCSQ8PFgIfAGVkZAJNDw8WAh8ABQhGRU1FTklOT2RkAk8PDxYCHwBlZGQCGw9kFgJmD2QWBAIBDw8WAh8CaGRkAgMPDxYCHwJnZGQCHw8PFgIfAGVkZAInD2QWAmYPZBYEAgMPPCsAEQMADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50AgEWAh4Hc3VtbWFyeQUmVGFibGEgY29uIGRldGFsbGUgZGUgaGlqb3MgcmVnaXN0cmFkb3MBEBYAFgAWAAwUKwAAFgJmD2QWBAIBD2QWCGYPD2QWBh4HaGVhZGVycwUIRGV0YWxsZXMeB2NhcHRpb24FCERldGFsbGVzHgh0YWJpbmRleAUCNDlkAgEPDxYCHwAFCTExODk3MDI2NxYGHwYFCTExODk3MDI2Nx8HBQkxMTg5NzAyNjcfCAUCNTBkAgIPDxYCHwAFCjMxLzAxLzIwMDQWBh8GBQozMS8wMS8yMDA0HwcFCjMxLzAxLzIwMDQfCAUCNTFkAgMPDxYCHwAFHkVOUklRVUUgQUxPTlNPIEFMUElaQVIgUEFESUxMQRYGHwYFHkVOUklRVUUgQUxPTlNPIEFMUElaQVIgUEFESUxMQR8HBR5FTlJJUVVFIEFMT05TTyBBTFBJWkFSIFBBRElMTEEfCAUCNTJkAgIPDxYCHwJoZGQCBQ8PFgIfAAUJMTA4MTgwOTU3ZGQCKQ9kFgJmD2QWAgIDDzwrABECARAWABYAFgAMFCsAAGQCKw9kFgJmD2QWAgIDDzwrABECARAWABYAFgAMFCsAAGQYBAUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgQFC0ltYWdlSW5pY2lvBRNJbWFnZUNvbnN1bHRhQ2VkdWxhBRNJbWFnZUNvbnN1bHRhTm9tYnJlBQpJbWFnZVNhbGlyBQxHcmlkdm90YWNpb24PZ2QFD0dyaWRtYXRyaW1vbmlvcw9nZAUJR3JpZGhpam9zDzwrAAwBCAIBZBIotxwEGdp460Sc84I9NPSb3CDf5Y6CkSmWGwzPjM4n",
      __EVENTVALIDATION:
        "/wEdABJ57kzfXWd/xamOYDJWOkEhR5DkKMZIOgQ68cJDv0CYJsYrrw85uciTs0i4KdeN/lBd3VPD6Wym8us3eHD1WYbKaVKlQMTjPgmzejb8J1bW3GaxzHw2jrl9nOQ7jgyUnouKpvKZtU1/1T76MOoqkFl4p+mKAhLa2OQRVtsukkxdEq4r5zXMYSo3RCI61JUiNtOjxdO8x6Y56JOyIK/nZgh6ZWKQT77IR2gdMu6BlXuwyD0wpbDJifIZpG6m66I+NROlF37D6nxCCYgX/GPzeTrj/B734HBXPkiGn5sLvwQ8UwJ8cnEIIaSrHRwRwVkhZty1N82k7PQIfi8qeAF/PEMhLaE20sJcIqr3ZMoyNhLgJfbhg5foBvYChFEldhw3pE9l3PowVqbxg8vo/8iwLtixHxol29tCrhahIrT6gvhlHQ==",
      __ASYNCPOST: "true",
      btnMostrarMatrimonios: "Mostrar",
    }),
  });

  const marriagesRoot = parse(await response.text());
  const marriages = Array.from(
    marriagesRoot.querySelectorAll("#Gridmatrimonios > tr")
  )
    .slice(1)
    .map((row) => {
      return Array.from(row.childNodes)
        .map((col) => {
          return col.innerText;
        })
        .slice(-3);
    })
    .map((marriage) => {
      return {
        date: marriage[0],
        type: marriage[1],
      };
    });

  const data = {
    id: root.getElementById("lblcedula")?.innerText,
    name: root.getElementById("lblnombrecompleto")?.innerText,
    dateOfBirth: root.getElementById("lblfechaNacimiento")?.innerText,
    age: root.getElementById("lbledad")?.innerText,
    deceased: root.getElementById("lbldefuncion2")?.innerText !== "",
    father: {
      id: root.getElementById("lblid_padre")?.innerText || "",
      name: root.getElementById("lblnombrepadre")?.innerText || "",
    },
    mother: {
      id: root.getElementById("lblid_madre")?.innerText || "",
      name: root.getElementById("lblnombremadre")?.innerText || "",
    },
    children: children,
    marriages: marriages,
  };

  if (!data.id) {
    return res.status(404).json({ message: "no records found" });
  }

  return res.status(200).json(data);
};

export default id;
