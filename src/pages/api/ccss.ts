import type { NextApiRequest, NextApiResponse } from "next";
import parse from "node-html-parser";
import type { Override } from "../../utils";
import { isValidID, parseParams } from "../../utils";

const COOKIES = [
  "dtCookie=v_4_srv_2_sn_8663A9ADDF100FB10CD07B11D1FCE04B_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_0; Expires=null; Domain=ccss.sa.cr; Path=/",
  "JSESSIONID=Ju5kwDKyE2W8xDHoT-lWEpKEfnv0f4UMk9MZ-wmptDun9vy6YHJ3!-1779364223; Path=/; HttpOnly; Domain=sfa.ccss.sa.cr",
  "AISSFA=!1rfBXpVqVv+JMs2RVlb6Jsvy/OQ9XrVHJs3qOdW+rTZbeqiGrny973A6O2ZjQreo7a0/UVammgchxJU=; Expires=null; Path=/; Secure; HttpOnly; Domain=sfa.ccss.sa.cr",
  "f5avraaaaaaaaaaaaaaaa_session_=JNPLKOJFNPICHHCIEBIDHLNPCIMPONDJGEHMJMODFEJIADCCMLGLEGJJNFIJKIEMELEDPBIMBCDEADCNKIKANFNAFMJKLPDFFGKOCICIMLANOCBJOMPCDJMAOEKIMOLB; Path=/servMedicos; Secure; HttpOnly; Domain=sfa.ccss.sa.cr",
  "TS01accbc5=01aa7a1b869b3b40dc792a0f357cd2668ed802b5273035a12b967034382610b7855c5f46b0a0776ab51f827f69f124398c33f9c81894488e0b89cf3d40566b3b138d54eb1e5717e776c6161d837748bf36eb954ef4f87702497ff25ae464ba7fdcbd9a11032dd1232019364fd5a5f223b6b4cfc1c7; Domain=sfa.ccss.sa.cr; Path=/",
];

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
    captcha: "81827",
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
        Cookie: COOKIES.join("; "),
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
