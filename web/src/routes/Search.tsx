import { useEffect } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

interface PersonListInfo {
  id: string;
  name: string;
  deceased: boolean;
}

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as PersonListInfo[];

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

  return (
    <main className="bg-[#F1F4F9] flex-1 flex items-center flex-col gap-8 p-4">
      <h3 className="text-2xl md:text-3xl">Search results</h3>
      <ul className="flex flex-col gap-2">
        {data.map((pi) => {
          return <PersonInfo key={pi.id} personInfo={pi} />;
        })}
      </ul>
    </main>
  );
};

const PersonInfo = ({ personInfo }: { personInfo: PersonListInfo }) => {
  return (
    <li className="hover:bg-[#CFE1FB] hover:font-bold cursor-pointer group flex gap-2 bg-white py-4 px-6 items-center justify-start rounded-md">
      <div className="flex-1 flex-col md:flex-row flex gap-1 md:gap-2">
        <p className="text-sm text-[#778396] md:text-black md:text-base">
          {personInfo.id}
        </p>
        <p className="flex-1">{personInfo.name}</p>
      </div>
      {personInfo.deceased && (
        <p className="bg-red-500 py-1 px-2 rounded-lg text-white font-bold text-xs">
          DECEASED
        </p>
      )}
      <BsArrowReturnRight className="ml-2 text-[#778396] invisible group-hover:visible" />
    </li>
  );
};

export default Search;
