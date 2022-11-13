import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { TSEService } from "../services";
import type { TSEData } from "../types";
import { isValidID } from "../utils";

interface Data {
  tse: TSEData;
}

const Result = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // id is undefined on first render, breaking everything else. need to check it here
    if (!id) {
      return;
    }
    (async () => {
      try {
        if (!isValidID(id)) {
          throw new Error("The provided ID is invalid");
        }
        const tseData = await TSEService.queryByID(id);
        setData({ tse: tseData });
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    })();
  }, [router, id]);

  return (
    <>
      {!data ? (
        <div className="flex h-full flex-col items-center justify-center gap-10">
          <SyncLoader />
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#F1F4F9] p-6">
          <div className="text-center">
            <p className="text-lg font-bold md:text-xl">TSE</p>
          </div>

          <section className="flex h-full w-full max-w-[1000px] flex-col items-center gap-6 rounded-md bg-white p-6 shadow">
            <div className="flex w-full flex-col items-center gap-3">
              <Head title="Informacion de la Persona" />
              <Row>
                <Col title="Cédula">
                  <p>{data.tse.id}</p>
                </Col>
                <Col title="Nombre completo">
                  <p>{data.tse.name}</p>
                </Col>
                <Col title="Fecha Nacimiento">
                  <p>{data.tse.dateOfBirth}</p>
                </Col>
                <Col title="Edad">
                  <p>{data.tse.age}</p>
                </Col>
              </Row>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <Head title="Informacion de los Padres" />
              <Row>
                <Col title="Cédula del padre">
                  <p>{data.tse.father.id}</p>
                </Col>
                <Col title="Nombre del padre">
                  <p>{data.tse.father.name}</p>
                </Col>
                <Col title="Cédula de la madre">
                  <p>{data.tse.mother.id}</p>
                </Col>
                <Col title="Nombre de la madre">
                  <p>{data.tse.mother.name}</p>
                </Col>
              </Row>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <Head title="Hijos Registrados" />
              <div className="flex w-full flex-col gap-6">
                {data.tse.children.length > 0 ? (
                  <>
                    {data.tse.children.map((c) => {
                      return (
                        <Row key={c.id}>
                          <Col title="Cédula">
                            <p>{c.id}</p>
                          </Col>
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
                {data.tse.marriages.length > 0 ? (
                  <div className="flex w-full flex-col justify-between gap-4">
                    {data.tse.marriages.map((c) => {
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
        </main>
      )}
    </>
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

export default Result;
