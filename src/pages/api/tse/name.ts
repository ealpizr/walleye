import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import type { TSEData } from "../../../types";
import { getTSEPageValidations, Override } from "../../../utils";
import { parseParams } from "../../../utils";

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

const requestEndpoint =
  "https://servicioselectorales.tse.go.cr/chc/consulta_nombres.aspx";
const resultEndpoint =
  "https://servicioselectorales.tse.go.cr/chc/muestra_nombres.aspx";

const id = async (
  req: Request,
  res: NextApiResponse<Partial<TSEData>[] | { message: string }>
) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      message: "query is required",
    });
  }

  const splittedQuery = query.trim().split(" ");
  if (splittedQuery.length < 3) {
    return res.status(400).json({
      message: "first name and both last names are required",
    });
  }

  splittedQuery.forEach((s) => {
    if (s.length < 3) {
      return res.status(400).json({
        message:
          "first name and both last names must be at least 3 characters long",
      });
    }
  });

  const name = splittedQuery.slice(0, -2).join(" ");
  const firstLastName = splittedQuery.slice(-2)[0];
  const secondLastName = splittedQuery.slice(-1)[0];

  const getCookie = await fetch(requestEndpoint);
  const sessionCookie = getCookie.headers.get("set-cookie") || "";

  const [viewState, eventValidation] = getTSEPageValidations(
    parse(await getCookie.text())
  );

  const params = {
    __VIEWSTATE: viewState,
    __EVENTVALIDATION: eventValidation,
    __ASYNCPOST: "true",
    btnConsultarNombre: "Consultar",
    txtnombre: name,
    txtapellido1: firstLastName,
    txtapellido2: secondLastName,
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

  const data = Array.from(
    root.querySelectorAll("tr > td > span > font > span > label")
  ).map((e) => {
    const splitted = e.innerHTML.split(" ");
    return {
      id: splitted[1],
      name: splitted.slice(4).join(" ").replace("     ***Fallecido***", ""),
      deceased: splitted.splice(-1).includes("***Fallecido***"),
    };
  });

  if (data.length === 0) {
    return res.status(404).json({ message: "no records found" });
  }

  res.status(200).json(data);
};

export default id;

/*
<tr>
    <td align="left" bgcolor="#BECAD0" style="width: 573px">
        <span id="chk1" style="display:inline-block;">
            <font face="Helvetica" color="#0000C0" size="3">
                <span tabindex="11">
                    <input id="chk1_0" type="checkbox" name="chk1$0" >
                    <label for="chk1_0">1- 102800672   OSCAR ARIAS SANCHEZ</label>
                </span>
            </font>
        </span>
    </td>
</tr>
*/
