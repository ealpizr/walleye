import type { CCSSData } from "../types";
import { Col, Head, Row } from "./display";

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

export default CCSSInformation;
