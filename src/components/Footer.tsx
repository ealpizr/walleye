const Footer = () => {
  return (
    <footer className="md:hidden py-4 px-2">
      <div className={`w-full flex justify-between items-center`}>
        <p className="text-lg text-[#A6A9AC]">Walleye</p>
        <ul className="flex gap-4">
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
