import type { RNPData } from "../types";
import { Col, Head, Row } from "./display";

interface Props {
  data: RNPData;
}

const RNPInformation = ({ data }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Bienes Muebles" />
        <div className="flex w-full flex-col gap-6">
          {data.muebles.length > 0 ? (
            <>
              {data.muebles.map((c) => {
                return (
                  <Row key={c.placa}>
                    <Col title="Placa">
                      <p>{c.placa}</p>
                    </Col>
                    <Col title="Marca">
                      <p>{c.descripcionMarca}</p>
                    </Col>
                    <Col title="Año Fabricación">
                      <p>{c.numeroAgnoFabricacion}</p>
                    </Col>
                  </Row>
                );
              })}
            </>
          ) : (
            <p className="text-center">No tiene bienes muebles registrados</p>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Head title="Bienes Inmuebles" />
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-6">
          {data.inmuebles.length > 0 ? (
            <div className="flex w-full flex-col justify-between gap-4">
              {data.inmuebles.map((c) => {
                return c.fincas.map((f) => {
                  return (
                    <Row key={c.name}>
                      <Col title="Derecho">
                        <p>{f.derecho}</p>
                      </Col>
                      <Col title="Cantón">
                        <p>{f.canton}</p>
                      </Col>
                      <Col title="Distrito">
                        <p>{f.distrito}</p>
                      </Col>
                      <Col title="Provincia">
                        <p>{f.provincia}</p>
                      </Col>
                      <Col title="Número">
                        <p>{f.numero}</p>
                      </Col>
                      <Col title="Medida">
                        <p>{f.medida}</p>
                      </Col>
                    </Row>
                  );
                });
              })}
            </div>
          ) : (
            <p className="w-full text-center">
              No tiene bienes inmbuebles registrados
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RNPInformation;
