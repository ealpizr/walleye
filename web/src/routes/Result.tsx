import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

  return <p>Result page</p>;
};

export default Result;
