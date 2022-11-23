import Image from "next/image";
import { useRouter } from "next/router";
import type { KeyboardEvent } from "react";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchIllustration from "../assets/search-illustration.svg";
import { TSEService } from "../services";
import { isNumber } from "../utils";

const Home = () => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault(); // prevent sweetalert from going crazy
      handleSearch();
    }
  };

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

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-[#F1F4F9]">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-8 md:flex-row">
        <h3 className="text-center text-2xl md:text-right md:text-4xl">
          Información de Registro Públicos
          <br />
          <span className="font-bold">En un solo lugar</span>
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
              onKeyDown={onInputKeyDown}
              className="flex-1 bg-transparent uppercase outline-none "
              ref={searchInputRef}
              autoFocus
              id="search"
              placeholder="OSCAR ARIAS SANCHEZ"
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
