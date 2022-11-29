import { env } from "process";
import { clientEnv } from "../env/schema.mjs";
import type { TSEData } from "../types";
import { Col, Head, Row } from "./display";

interface Props {
  data: TSEData;
}

const getLinkFromID = (id: string) => {
  const p = <p>{id}</p>;
  if (id === "NO REGISTRADO") {
    return p;
  }

  return (
    <a
      className="cursor-pointer underline transition-all hover:text-blue-500"
      href={`${clientEnv.NEXT_PUBLIC_BASE_URL}/${id}`}
    >
      {p}
    </a>
  );
};

const TSEInformation = ({ data }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Información de la Persona" />
        <Row>
          <Col title="Cédula">
            <p>{data.id}</p>
          </Col>
          <Col title="Nombre completo">
            <p>{data.name}</p>
          </Col>
          <Col title="Fecha Nacimiento">
            <p>{data.dateOfBirth}</p>
          </Col>
          <Col title="Edad">
            <p>{data.age}</p>
            {data.deceased && (
              <p className="w-fit rounded-lg bg-red-500 py-1 px-2 text-xs font-bold text-white">
                FALLECIDO
              </p>
            )}
          </Col>
        </Row>
        {data.electoralData.provincia && (
          <Row>
            <Col title="Vencimiento Cedula">
              <p>{data.idExpiration}</p>
            </Col>
            <Col title="Provincia">
              <p>{data.electoralData.provincia}</p>
            </Col>
            <Col title="Canton">
              <p>{data.electoralData.canton}</p>
            </Col>
            <Col title="Distritio Administrativo">
              <p>{data.electoralData.distritoAdministrativo}</p>
            </Col>
            <Col title="Distrito Electoral">
              <p>{data.electoralData.distritoElectoral}</p>
            </Col>
          </Row>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Información de los Padres" />
        <Row>
          <Col title="Cédula del padre">{getLinkFromID(data.father.id)}</Col>
          <Col title="Nombre del padre">
            <p>{data.father.name}</p>
          </Col>
          <Col title="Cédula de la madre">{getLinkFromID(data.mother.id)}</Col>
          <Col title="Nombre de la madre">
            <p>{data.mother.name}</p>
          </Col>
        </Row>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Hijos Registrados" />
        <div className="flex w-full flex-col gap-6">
          {data.children.length > 0 ? (
            <>
              {data.children.map((c) => {
                return (
                  <Row key={c.id}>
                    <Col title="Cédula">{getLinkFromID(c.id)}</Col>
                    <Col title="Nombre completo">
                      <p>{c.name}</p>
                    </Col>
                    <Col title="Fecha de nacimiento">
                      <p>{c.dateOfBirth}</p>
                    </Col>
                  </Row>
                );
              })}
            </>
          ) : (
            <p className="text-center">No tiene hijos registrados</p>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Matrimonios Registrados" />
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-6">
          {data.marriages.length > 0 ? (
            <div className="flex w-full flex-col justify-between gap-4">
              {data.marriages.map((c) => {
                return (
                  <Row key={c.date}>
                    <Col title="Tipo">
                      <p>{c.type}</p>
                    </Col>
                    <Col title="Fecha">
                      <p>{c.date}</p>
                    </Col>
                  </Row>
                );
              })}
            </div>
          ) : (
            <p className="w-full text-center">
              No tiene matrimonios registrados
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TSEInformation;
