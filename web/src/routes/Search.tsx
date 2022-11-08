import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

  console.log(data);

  return <p>Search page</p>;
};

export default Search;
