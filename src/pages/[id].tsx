import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import TSEInformation from "../components/TSEInformation";
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
          <TSEInformation data={data.tse} />
        </main>
      )}
    </>
  );
};

export default Result;
