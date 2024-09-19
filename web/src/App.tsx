import { Outlet } from "react-router-dom";

import HeaderNavigation from "@components/HeaderNavigation";
import useMode from "@hooks/useMode";

function App() {
  console.log("import.meta.env:", import.meta.env);
  useMode();
  
  return (
    <>
      <HeaderNavigation />
      <Outlet />
    </>
  );
}

export default App;
