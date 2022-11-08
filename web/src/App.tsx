import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./routes/404";
import Home from "./routes/Home";
import Search from "./routes/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
