import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";

interface PersonListInfo {
  id: string;
  name: string;
  deceased: boolean;
}

const Search = () => {
  const router = useRouter();
  const [data, setData] = useState<PersonListInfo[]>([]);

  useEffect(() => {
    (() => {
      const { results } = router.query;
      if (!results) {
        return router.push("/");
      }
      setData(JSON.parse(results as string) as PersonListInfo[]);
    })();
  }, [router.query]);

  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-[#F1F4F9] p-4">
      <h3 className="text-2xl md:text-3xl">Resultados de Búsqueda</h3>
      <ul className="flex flex-col gap-2">
        {data.map((pi) => {
          return (
            <Link href={`/${pi.id}`} key={pi.id}>
              <PersonInfo personInfo={pi} />
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

const PersonInfo = ({ personInfo }: { personInfo: PersonListInfo }) => {
  return (
    <li className="group flex cursor-pointer items-center justify-start gap-2 rounded-md bg-white py-4 px-6 hover:bg-[#CFE1FB] hover:font-bold">
      <div className="flex flex-1 flex-col gap-1 md:flex-row md:gap-2">
        <p className="text-sm text-[#778396] md:text-base md:text-black">
          {personInfo.id}
        </p>
        <p className="flex-1">{personInfo.name}</p>
      </div>
      {personInfo.deceased && (
        <p className="rounded-lg bg-red-500 py-1 px-2 text-xs font-bold text-white">
          FALLECIDO
        </p>
      )}
      <BsArrowReturnRight className="invisible ml-2 text-[#778396] group-hover:visible" />
    </li>
  );
};

export default Search;
