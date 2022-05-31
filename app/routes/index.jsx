import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function ErrorBoundary({ error }) {
  return (
      <p>{error.message}</p>
  );
}

export default function Index() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated)
        loginWithRedirect()
    }
  },[isAuthenticated,isLoading])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>Index Page</div>

}
