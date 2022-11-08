import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchIllustration from "../assets/search-illustration.svg";

interface PersonInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  idExpiration?: string;
  deceased: boolean;
}

interface PersonListInfo {
  id: string;
  name: string;
  deceased: boolean;
}

type APIResponse = PersonInfo[] | PersonListInfo[] | { error: string };

const Home = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!searchInputRef.current || searchInputRef.current.value == "") {
      return;
    }

    Swal.fire({
      title: "Searching",
      heightAuto: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
        setTimeout(() => {
          searchPeople(searchInputRef.current!.value)
            .then((result) => {
              Swal.close();
              if (result.length > 1) {
                return navigate("/search", { state: result });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                icon: "error",
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false,
                html: error,
              });
            });
        }, 500);
      },
    });
  };

  const searchPeople = (
    query: string
  ): Promise<PersonInfo[] | PersonListInfo[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tse`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query,
            }),
          }
        );
        const body = (await response.json()) as APIResponse;
        if (response.status != 200) {
          return reject((body as { error: string }).error);
        }
        return resolve(body as PersonInfo[] | PersonListInfo[]);
      } catch (error) {
        return reject(error);
      }
    });
  };

  return (
    <main className="bg-[#F1F4F9] flex-1 flex items-center flex-col justify-center gap-8">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl items-center justify-between">
        <h3 className="text-2xl text-right md:text-5xl">
          Search People &<br />
          Public Records
        </h3>
        <img className="md:w-full max-w-[320px]" src={SearchIllustration} />
      </div>

      <div className="flex items-center justify-center flex-col gap-5 w-full mb-4 md:flex-row">
        <label
          className="w-full max-w-[90%] flex items-center justify-center md:max-w-[800px]"
          htmlFor="search"
        >
          <div className="border border-[#CFE1FB] text-[#778396] rounded-md flex items-center gap-2 py-2 px-4 flex-1">
            <AiOutlineSearch className="text-xl md:text-2xl" />
            <input
              className="uppercase flex-1 bg-transparent outline-none "
              ref={searchInputRef}
              autoFocus
              id="search"
              placeholder="Search"
            />
            <button
              className="text-white bg-[#0368FF] py-3 px-6 rounded-md hidden md:block"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </label>
        <button
          className="text-white bg-[#0368FF] py-3 px-6 rounded-md md:hidden"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </main>
  );
};

export default Home;
