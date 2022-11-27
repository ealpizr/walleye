import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import type { TSEData } from "../../../types";
import { getTSEPageValidations, Override } from "../../../utils";
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

  let [viewState, eventValidation] = getTSEPageValidations(
    parse(await getCookie.text())
  );

  // POST QUERY
  await fetch(TSE_ID_QUERY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE: viewState,
      __EVENTVALIDATION: eventValidation,
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

  [viewState, eventValidation] = getTSEPageValidations(root);

  // GET CHILDREN
  response = await fetch(TSE_SINGLE_RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE: viewState,
      __EVENTVALIDATION: eventValidation,
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
        id: child[0] || "",
        name: child[2] || "",
        dateOfBirth: child[1] || "",
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
      __VIEWSTATE: viewState,
      __EVENTVALIDATION: eventValidation,
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
        date: marriage[0] || "",
        type: marriage[1] || "",
      };
    });

  // ELECTORAL DATA
  response = await fetch(TSE_SINGLE_RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE: viewState,
      __EVENTVALIDATION: eventValidation,
      __ASYNCPOST: "true",
      btnMostrarVotacion: "Mostrar",
    }),
  });

  const votationRoot = parse(await response.text());
  const updateData = votationRoot.lastChild.toString();

  viewState = updateData.split("__VIEWSTATE|")[1]?.split("|")[0];
  eventValidation = updateData.split("__EVENTVALIDATION|")[1]?.split("|")[0];

  await fetch(TSE_SINGLE_RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0", // this is required for some reason
      Cookie: sessionCookie,
    },
    body: parseParams({
      __VIEWSTATE: viewState,
      __EVENTVALIDATION: eventValidation,
      __ASYNCPOST: "true",
      __EVENTTARGET: "Gridvotacion",
      __EVENTARGUMENT: "Select$0",
    }),
  });

  response = await fetch(
    "https://servicioselectorales.tse.go.cr/chc/detalle_votacion.aspx",
    {
      method: "GET",
      headers: {
        Cookie: sessionCookie,
      },
    }
  );

  const electoralRoot = parse(await response.text());

  const electoralData = {
    provincia: electoralRoot.getElementById("lblprovincia")?.innerText,
    canton: electoralRoot.getElementById("lblcanton")?.innerText,
    distritoAdministrativo: electoralRoot.getElementById(
      "lbldistrito_administrativo"
    )?.innerText,
    distritoElectoral: electoralRoot.getElementById("lbldistrito_electoral")
      ?.innerText,
  };

  // RESPONSE
  const data = {
    id: root.getElementById("lblcedula")?.innerText,
    idExpiration: electoralRoot.getElementById("lblvencimiento_cedula")
      ?.innerText,
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
    electoralData,
  };

  if (!data.id) {
    return res.status(404).json({ message: "no records found" });
  }

  if (data.father.id === "0") {
    data.father.id = "NO REGISTRADO";
  }

  if (data.mother.id === "0") {
    data.mother.id = "NO REGISTRADO";
  }

  return res.status(200).json(data);
};

export default id;
