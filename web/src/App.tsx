import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./routes/404";
import Home from "./routes/Home";
import Result from "./routes/Result";
import Search from "./routes/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout children={<Outlet />} />}>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
