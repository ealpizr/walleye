import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
          <section className="flex h-full w-full max-w-[1000px] flex-col items-center">
            <p className="text-md mb-1 w-full border-b border-blue-400 text-center font-bold md:text-lg">
              Informacion de la Persona
            </p>
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p>Cédula</p>
                  <p>{data.tse.id}</p>
                </div>
                <div>
                  <p>Nombre completo</p>
                  <p>{data.tse.name}</p>
                </div>
                <div>
                  <p>Fecha de Nacimiento</p>
                  <p>{data.tse.dateOfBirth}</p>
                </div>
                <div>
                  <p>Edad</p>
                  <p>{data.tse.age}</p>
                </div>
              </div>
              <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p>Cédula del padre</p>
                  <p>{data.tse.father.id}</p>
                </div>
                <div>
                  <p>Nombre del padre</p>
                  <p>{data.tse.father.name}</p>
                </div>
                <div>
                  <p>Cédula de la madre</p>
                  <p>{data.tse.mother.id}</p>
                </div>
                <div>
                  <p>Nombre de la Madre</p>
                  <p>{data.tse.mother.name}</p>
                </div>
              </div>
            </div>
            <p className="text-md mb-1 w-full border-b border-blue-400 text-center font-bold md:text-lg">
              Hijos Registrados
            </p>
            {data.tse.children.length > 0 ? (
              <div className="flex w-full flex-col justify-between gap-4">
                {data.tse.children.map((c) => {
                  return (
                    <div
                      key={c.id}
                      className="flex w-full flex-row justify-between gap-4"
                    >
                      <div>
                        <p>Cédula</p>
                        <p>{c.id}</p>
                      </div>
                      <div>
                        <p>Nombre completo</p>
                        <p>{c.name}</p>
                      </div>
                      <div>
                        <p>Fecha de nacimiento</p>
                        <p>{c.dateOfBirth}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No tiene hijos registrados</p>
            )}
            <p className="text-md mb-1 w-full border-b border-blue-400 text-center font-bold md:text-lg">
              Matrimonios Registrados
            </p>
            {data.tse.marriages.length > 0 ? (
              <div className="flex w-full flex-col justify-between gap-4">
                {data.tse.marriages.map((m) => {
                  return (
                    <div
                      key={m.date}
                      className="flex w-full flex-row justify-between gap-4"
                    >
                      <div>
                        <p>Tipo</p>
                        <p>{m.type}</p>
                      </div>
                      <div>
                        <p>Fecha</p>
                        <p>{m.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No tiene matrimonios registrados</p>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default Result;
