import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { dark } from "../styles/Themes";
import { useEffect, useState } from "react";

import Lan from "../sections/Lan";
import { AnimatePresence } from "framer-motion";
import Abou from "../sections/Abou";
import Foote from '../sections/Foote';
import Loader from "./comp/Loader";

function Land() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add a delay before setting `loaded` to true
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(loadTimer); // Clean up timer on unmount
  }, []);

  // Debugging: Check if `loaded` state changes correctly
  useEffect(() => {
    console.log("Loaded state: ", loaded); // Check when loaded state changes
  }, [loaded]);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <AnimatePresence>
          {loaded ? (
            <main className="App">
              <Lan />
              <Abou />
              <Foote />
            </main>
          ) : (
            <Loader />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default Land;
