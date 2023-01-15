import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Routes/Router";
import { UniversalContext } from "./ContextSupplier/ContextSupplier";


function App() {
  const { mode } = useContext(UniversalContext);

  // Dark Mode setup
  const getDesignTokens = (mode) => (
    {
      palette: {
        mode,
        ...(mode === 'light' ?
          {
            // palette values for light mode
            divider: grey[900],
            a: lightBlue
          }
          :
          {
            // palette values for dark mode            
            divider: grey[50]
          }
        ),
      },
    }
  );

  const theme = createTheme(getDesignTokens(mode));


  return (
    <div>
      <ThemeProvider theme={theme}>
        <Toaster />
        <CssBaseline />
        <RouterProvider router={router} ></RouterProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
