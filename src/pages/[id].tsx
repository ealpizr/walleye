import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { TSEData } from "../types";

interface Data {
  tse: TSEData;
}

const Result = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          return;
        }
        const queryTSE = (): Promise<TSEData> => {
          return new Promise(async (resolve, reject) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/tse/id`,
              {
                method: "POST",
                body: JSON.stringify({
                  query: id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (res.status !== 200) {
              return reject();
            }
            const body = await res.json();
            resolve(body);
          });
        };
        const tse = await queryTSE();
        setData({
          tse: tse,
        });
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    })();
  }, [router, id]);

  return <>{!data ? <p>Loading...</p> : <p>Got some dataaa</p>}</>;
};

export default Result;
