import { AiOutlineSearch } from "react-icons/ai";
import SearchIllustration from "./assets/search-illustration.svg";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
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
                autoFocus
                id="search"
                placeholder="Search"
              />
              <button className="text-white bg-[#0368FF] py-3 px-6 rounded-md hidden md:block">
                Search
              </button>
            </div>
          </label>
          <button className="text-white bg-[#0368FF] py-3 px-6 rounded-md md:hidden">
            Search
          </button>
        </div>
      </main>
      <footer className="md:hidden py-4 px-2">
        <A />
      </footer>
    </div>
  );
};

const A = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-between items-center ${className}`}>
      <p className="text-lg">Walleye</p>
      <ul className="flex gap-4">
        <li>
          <a href="">API</a>
        </li>
        <li>
          <a href="">Github</a>
        </li>
      </ul>
    </div>
  );
};

export default App;
