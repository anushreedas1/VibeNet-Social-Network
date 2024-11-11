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

  // Add a delay before setting `loaded` to true
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    
    return () => clearTimeout(loadTimer); // Clear timeout on unmount
  }, []);

  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        <AnimatePresence>{loaded ? null : <Loader />}</AnimatePresence>

        {/* Render LocomotiveScrollProvider only when loaded */}
        {loaded && (
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
            <AnimatePresence>
              <main className="App" data-scroll-container ref={containerRef}>
                <Lan />
                <Abou />
                <Foote />
              </main>
            </AnimatePresence>
          </LocomotiveScrollProvider>
        )}
      </ThemeProvider>
    </>
  );
}

export default Land;
