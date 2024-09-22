import { Outlet } from "react-router-dom";

import HeaderNavigation from "@components/HeaderNavigation";
import useMode from "@hooks/useMode";

function App() {
  useMode();
  
  return (
    <>
      <HeaderNavigation />
      <Outlet />
    </>
  );
}

export default App;
