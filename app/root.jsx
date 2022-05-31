import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return ({
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}




export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigate = useNavigate()
  const data = useLoaderData();
  const callbackUrl = data.ENV.NODE_ENV === "production" ? 'https://test.dev100.workers.dev/callback' : 'http://localhost:8787/callback'


  return (

    <html lang="en">
      <Auth0Provider
        domain="dev-lj5y3y8f.eu.auth0.com"
        clientId="wigUFkwtdoNNHC3efYVxIysRFhSA08Tq"
        redirectUri={callbackUrl}
      >
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <button onClick={() => navigate("/logout")}>Logout</button>
        
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </Auth0Provider>
    </html>

  );
}
