import { Toaster } from "react-hot-toast";
import { NavBar } from "./components/mainComponents/NavBar";
import { MainRoutes } from "./routes/MainRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <MainRoutes />
    </>
  );
}

export default App;
