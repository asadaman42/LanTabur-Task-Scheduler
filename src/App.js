import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Routes/Router";


function App() {
  return (
    <div>
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
