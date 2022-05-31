import { Outlet } from "@remix-run/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Private() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated)
        loginWithRedirect()
    }
  },[isAuthenticated,isLoading])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <Outlet />

}
