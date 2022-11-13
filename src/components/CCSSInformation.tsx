import type { CCSSData } from "../types";

interface Props {
  data: CCSSData;
}

const CCSSInformation = ({ data }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Validacion de Derechos" />
        <Row>
          <Col title="Estado Seguro">
            <p>{data.asegurado}</p>
          </Col>
        </Row>
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

export default CCSSInformation;
