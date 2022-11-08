import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col h-full overflow-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
