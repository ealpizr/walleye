import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchIllustration from "../assets/search-illustration.svg";
import { TSEService } from "../services";
import { isNumber } from "../utils";

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

type APIResponse = PersonInfo | PersonListInfo[] | { message: string };

const Home = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    Swal.fire({
      title: "Searching",
      heightAuto: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
        setTimeout(async () => {
          try {
            if (!searchInputRef.current || searchInputRef.current.value == "") {
              return Swal.close();
            }
            const query = searchInputRef.current.value;

            if (isNumber(query)) {
              const result = await TSEService.queryByID(query);
              router.push(`/${result.id}`);
              return Swal.close();
            }

            const results = await TSEService.queryByName(query);
            if (results.length === 1 && results[0]) {
              router.push(`/${results[0].id}`);
              return Swal.close();
            }
            router.push(
              {
                pathname: "/search",
                query: { results: JSON.stringify(results) },
              },
              "/search"
            );
            Swal.close();
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              heightAuto: false,
              html: error as string,
            });
          }
        }, 500);
      },
    });
  };

  const searchPeople = (
    query: string
  ): Promise<PersonInfo | Partial<PersonInfo>[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/name`;
        if (isNumber(query)) {
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/id`;
        }
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
          }),
        });
        const body = (await response.json()) as APIResponse;
        if (response.status != 200) {
          return reject((body as { message: string }).message);
        }
        if (Array.isArray(body) && body.length == 1) {
          return resolve(body[0] as PersonInfo);
        }
        return resolve(body as PersonInfo | Partial<PersonInfo>[]);
      } catch (error) {
        return reject(error);
      }
    });
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-[#F1F4F9]">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-8 md:flex-row">
        <h3 className="text-right text-2xl md:text-5xl">
          Search People &<br />
          Public Records
        </h3>
        <Image
          className="max-w-[320px] md:w-full"
          src={SearchIllustration}
          alt="Search people illustration"
        />
      </div>

      <div className="mb-4 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <label
          className="flex w-full max-w-[90%] items-center justify-center md:max-w-[800px]"
          htmlFor="search"
        >
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[#CFE1FB] py-2 px-4 text-[#778396]">
            <AiOutlineSearch className="text-xl md:text-2xl" />
            <input
              className="flex-1 bg-transparent uppercase outline-none "
              ref={searchInputRef}
              autoFocus
              id="search"
              placeholder="Search"
            />
            <button
              className="hidden rounded-md bg-[#0368FF] py-3 px-6 text-white md:block"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </label>
        <button
          className="rounded-md bg-[#0368FF] py-3 px-6 text-white md:hidden"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </main>
  );
};

export default Home;
