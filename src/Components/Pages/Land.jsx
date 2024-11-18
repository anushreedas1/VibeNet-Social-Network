import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { dark } from "../styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';

import Lan from "../sections/Lan";
import { AnimatePresence } from "framer-motion";
import Abou from "../sections/Abou";
import ScrollTriggerProxy from './comp/ScrollTriggerProxy';
import Foote from '../sections/Foote';
import Loader from "./comp/Loader";

function Land() {
  const containerRef = useRef(null);
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
            // Render LocomotiveScrollProvider only after loading is complete
            <LocomotiveScrollProvider
              options={{
                smooth: true,
                smartphone: { smooth: true },
                tablet: { smooth: true },
              }}
              watch={[]}
              containerRef={containerRef}
            >
              <ScrollTriggerProxy />
              <main className="App" data-scroll-container ref={containerRef}>
                <Lan />
                <Abou />
                <Foote />
              </main>
            </LocomotiveScrollProvider>
          ) : (
            // Show loader while `loaded` is false
            <Loader />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default Land;
