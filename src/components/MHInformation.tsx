import type { MHData } from "../types";

interface Props {
  data: MHData;
}

const MHInformation = ({ data }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Situacion Tributaria" />
        <Row>
          <Col title="Estado">
            <p>{data.status}</p>
          </Col>
          <Col title="Regimen">
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
                    <Col title="Codigo">
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

const Head = ({ title }: { title: string }) => {
  return (
    <p className="w-full border-b-2 border-blue-400 pb-2 text-center text-lg font-bold">
      {title}
    </p>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col justify-evenly gap-2 md:flex-row md:gap-6">
      {children}
    </div>
  );
};

const Col = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="md:text-center">
      <p className="font-bold text-blue-500">{title}</p>
      {children}
    </div>
  );
};

export default MHInformation;
