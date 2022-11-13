import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CCSSInformation from "../components/CCSSInformation";
import MHInformation from "../components/MHInformation";
import TSEInformation from "../components/TSEInformation";
import { CCSSService, MHService, TSEService } from "../services";
import type { CCSSData, MHData, TSEData } from "../types";
import { isValidID } from "../utils";

interface Data {
  tse: TSEData;
  mh: MHData;
  ccss: CCSSData;
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
        const mhData = await MHService.queryByID(id);
        const ccssData = await CCSSService.queryByID(id);
        setData({ tse: tseData, mh: mhData, ccss: ccssData });
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
        <main className="flex flex-1 flex-col items-center  gap-4 bg-[#F1F4F9] p-6">
          <div className="text-center">
            <p className="text-lg font-bold md:text-xl">{data.tse.name}</p>
          </div>
          <div className="w-full max-w-[1000px]">
            <Tabs className="w-full">
              <TabList>
                <Tab>TSE</Tab>
                <Tab>MH</Tab>
                <Tab>CCSS</Tab>
              </TabList>

              <TabPanel>
                <TSEInformation data={data.tse} />
              </TabPanel>
              <TabPanel>
                <MHInformation data={data.mh} />
              </TabPanel>
              <TabPanel>
                <CCSSInformation data={data.ccss} />
              </TabPanel>
            </Tabs>
          </div>
        </main>
      )}
    </>
  );
};

export default Result;
