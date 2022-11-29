import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-center p-4">
      <Link href="/">
        <img src="/walleye.svg" alt="" />
      </Link>
      <div
        className={`hidden w-full items-center justify-between px-4 md:flex`}
      >
        <p className="text-lg">Walleye</p>
        <ul className="flex gap-4">
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="https://github.com/ealpizr/walleye">Github</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
