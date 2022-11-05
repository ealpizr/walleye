import type { Request, Response } from "express";
import puppeteer, { Page } from "puppeteer";

interface PersonInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  idExpiration: string;
  deceased: boolean;
}

interface RequestBody {
  query: string;
}

interface TSERequest extends Request {
  body: RequestBody;
}

type TSEResponse = PersonInfo | { error: string } | {};

const isNumber = (s: any) => !isNaN(parseFloat(s)) && !isNaN(s - 0);

const tseController = async (req: TSERequest, res: Response<TSEResponse>) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      error: "query is required",
    });
  }

  // Check if query is ID
  if (isNumber(query)) {
    // IDs must be 9 digits long
    if (query.length < 9) {
      return res.status(400).json({
        error: "id must be 9 digits long",
      });
    }
    const data = await queryById(query);
    return res.status(200).json(data);
  }

  const data = await queryByName(query);

  res.status(200).send(data);
};

const queryById = async (query: string): Promise<PersonInfo | {}> => {
  const idInputSelector = "input[name=txtcedula]";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx"
  );
  await page.waitForSelector(idInputSelector);
  await page.type(idInputSelector, query);
  await page.click("input[name=btnConsultaCedula]");

  const data = await scrapData(page);
  return { ...data };
};

const queryByName = async (
  query: string
): Promise<
  | {}
  | {
      id: string;
      name: string;
      deceased: boolean;
    }[]
> => {
  const splittledQuery = query.split(" ");

  if (splittledQuery.length < 3) {
    return {};
  }

  const name = splittledQuery.slice(0, -2).join(" ");
  const firstLastName = splittledQuery.slice(-2)[0];
  const secondlastName = splittledQuery.slice(-1)[0];

  console.log(name);
  console.log(firstLastName);
  console.log(secondlastName);

  const nameInputSelector = "input[name=txtnombre]";
  const firstLastNameInputSelector = "input[name=txtapellido1]";
  const secondLastNameInputSelector = "input[name=txtapellido2]";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://servicioselectorales.tse.go.cr/chc/consulta_nombres.aspx"
  );
  await page.waitForSelector(nameInputSelector);

  await page.type(nameInputSelector, name);

  await page.type(firstLastNameInputSelector, firstLastName);
  await page.type(secondLastNameInputSelector, secondlastName);
  await page.click("input[name=btnConsultarNombre]");

  await page.waitForSelector("input[name=Button1]");

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("tr > td > span > label"))
      .map(e => {
        const splitted = e.innerHTML.split(" ");
        return {
          id: splitted[1],
          name: splitted.slice(4).join(" ").replace("     ***Fallecido***", ""),
          deceased: splitted.splice(-1).includes("***Fallecido***"),
        };
      })
      .slice(1);
  });

  return data;
};

const scrapData = async (page: Page): Promise<PersonInfo | {}> => {
  await page.waitForSelector("#lblnombrecompleto, #lblmensaje1");
  if (page.url().includes("error")) {
    return {};
  }

  const personData = await page.evaluate(() => {
    return {
      id: document.getElementById("lblcedula")?.innerHTML.toString() || "",
      name:
        document.getElementById("lblnombrecompleto")?.innerText.toString() ||
        "",
      dateOfBirth:
        document.getElementById("lblfechaNacimiento")?.innerHTML.toString() ||
        "",
      age: document.getElementById("lbledad")?.innerHTML.toString() || "",
      deceased:
        document.getElementById("lbldefuncion2")?.innerHTML.toString() !== "",
    };
  });

  let votationData;
  if (!personData.deceased) {
    await page.click("input[name=btnMostrarVotacion]");
    await page.waitForSelector("#Gridvotacion");
    await page.click("#Gridvotacion > tbody > tr > td > a");
    await page.waitForSelector("#lblvencimiento_cedula");

    votationData = await page.evaluate(() => {
      return {
        idExpiration:
          document.getElementById("lblvencimiento_cedula")?.innerText || "",
      };
    });
  }

  return {
    ...personData,
    ...votationData,
  };
};

export default tseController;
