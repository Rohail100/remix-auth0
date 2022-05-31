import { useAuth0 } from "@auth0/auth0-react";

export default function logout() {
  const { logout } = useAuth0()

  if (typeof window !== "undefined") {
    logout({ returnTo: window.location.origin })
  }
  return <div>Loading...</div>
}
