import type { NextApiRequest, NextApiResponse } from "next";
import parse from "node-html-parser";
import type { Override } from "../../utils";
import { isValidID, parseParams } from "../../utils";

type Request = Override<
  NextApiRequest,
  {
    body: {
      query: string;
    };
  }
>;

const ccss = async (req: Request, res: NextApiResponse) => {
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

  const params = {
    numIdentificacion: query,
    tipIdentificacion: 0,
    accion: "VD",
  };

  const response = await fetch(
    "https://sfa.ccss.sa.cr/servMedicos/validarDerechos.do",
    {
      method: "POST",
      body: parseParams(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  );

  const root = parse(await response.text());
  const result =
    root.querySelector("#msgInfoContainer > p")?.innerText.split("\n")[0] || "";

  res.status(200).json({
    asegurado: result.trim(),
  });
};

export default ccss;
