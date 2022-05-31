import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

const Callback = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate()

  useEffect(()=>{
    if (isAuthenticated)
      navigate("/profile")
    else
      navigate("/")
  },[isAuthenticated])

  return <div>Loading...</div>

};

export default Callback;