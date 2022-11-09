const Header = () => {
  return (
    <header className="flex items-center justify-center p-4">
      <a href="">
        <img src="/walleye.svg" alt="" />
      </a>
      <div
        className={`w-full justify-between items-center hidden md:flex px-4`}
      >
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
    </header>
  );
};

export default Header;
