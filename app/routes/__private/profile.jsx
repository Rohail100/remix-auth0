import { useAuth0 } from "@auth0/auth0-react";
import { ClientOnly } from "remix-utils";
import Display from "../../components/Display";

const Callback = () => {

  const { user } = useAuth0();

  return (
      <ClientOnly fallback={<div>fallback</div>}>{()=><Display user={user}/>}</ClientOnly>

  );

};

export default Callback;