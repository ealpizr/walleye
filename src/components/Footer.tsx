const Footer = () => {
  return (
    <footer className="py-4 px-2 md:hidden">
      <div className={`flex w-full items-center justify-between`}>
        <p className="text-lg text-[#A6A9AC]">Walleye</p>
        <ul className="flex gap-4">
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="https://github.com/ealpizr/walleye">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
