import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function NotFound() {
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
    else if(!isAuthenticated)
        return window.location.href="/"
    
    return <div>Not Found</div>
}
