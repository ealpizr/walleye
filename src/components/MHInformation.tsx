import type { MHData } from "../types";
import { Col, Head, Row } from "./display";

interface Props {
  data: MHData;
}

const MHInformation = ({ data }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Situación Tributaria" />
        <Row>
          <Col title="Estado">
            <p>{data.status}</p>
          </Col>
          <Col title="Régimen">
            <p>{data.regimen}</p>
          </Col>
          <Col title="Moroso">
            <p>{String(data.inDebt)}</p>
          </Col>
          <Col title="Omiso">
            <p>{String(data.hasIgnoredDeclarations)}</p>
          </Col>
        </Row>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Actividades Registradas" />
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-6">
          {data.activities.length > 0 ? (
            <div className="flex w-full flex-col justify-between gap-4">
              {data.activities.map((a) => {
                return (
                  <Row key={a.code}>
                    <Col title="Código">
                      <p>{a.code}</p>
                    </Col>
                    <Col title="Actividad">
                      <p>{a.name}</p>
                    </Col>
                    <Col title="Estado">
                      <p>{a.status}</p>
                    </Col>
                  </Row>
                );
              })}
            </div>
          ) : (
            <p className="w-full text-center">
              No tiene actividades registrados
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MHInformation;
