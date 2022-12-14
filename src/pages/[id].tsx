import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ccssLogo from "../assets/ccss.png";
import mhLogo from "../assets/mh.png";
import rnpLogo from "../assets/rnp.png";
import tseLogo from "../assets/tse.png";
import CCSSInformation from "../components/CCSSInformation";
import MHInformation from "../components/MHInformation";
import RNPInformation from "../components/RNPInformation";
import TSEInformation from "../components/TSEInformation";
import { CCSSService, MHService, TSEService } from "../services";
import RNPService from "../services/rnp";
import type { CCSSData, MHData, RNPData, TSEData } from "../types";
import { isValidID } from "../utils";

interface Data {
  tse: TSEData;
  mh: MHData;
  ccss: CCSSData;
  rnp: RNPData;
}

const Result = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<string>(
    "Tribunal Supremo de Elecciones"
  );

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
        setLoading("Ministerio de Hacienda");
        const mhData = await MHService.queryByID(id);
        setLoading("Caja Costarricense de Seguro Social");
        const ccssData = await CCSSService.queryByID(id);
        setLoading("Registro Nacional");
        const rnpData = await RNPService.queryByID(id);
        setData({ tse: tseData, mh: mhData, ccss: ccssData, rnp: rnpData });
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
          <div className="text-center">
            <p className="text-xl">Recopilando informaci??n...</p>
            <p className="font-bold">{loading}</p>
          </div>
        </div>
      ) : (
        <main className="flex flex-1 flex-col items-center  gap-4 bg-[#F1F4F9] p-6">
          <div className="text-center">
            <p className="text-lg font-bold md:text-xl">{data.tse.name}</p>
          </div>
          <div className="w-full max-w-[1000px]">
            <Tabs className="w-full">
              <TabList>
                <Tab>
                  <img className="max-h-[50px]" src={tseLogo.src} />
                </Tab>
                <Tab>
                  <img className="max-h-[50px]" src={mhLogo.src} />
                </Tab>
                <Tab>
                  <img className="max-h-[50px]" src={ccssLogo.src} />
                </Tab>
                <Tab>
                  <img className="max-h-[50px]" src={rnpLogo.src} />
                </Tab>
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
              <TabPanel>
                <RNPInformation data={data.rnp} />
              </TabPanel>
            </Tabs>
          </div>
        </main>
      )}
    </>
  );
};

export default Result;
