import React, { Suspense } from "react";
import styled from "styled-components";

// Adjust the import paths based on the correct location of the components
const CoverVideo = React.lazy(() => import("../Pages/comp/CoverVideo"));
const NavBar = React.lazy(() => import("../Pages/comp/NavBar"));
const Logo = React.lazy(() => import("../Pages/comp/Logo"));

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Lan = () => { // Keep it as Lan
  return (
    <Section id="home">
      <Suspense fallback={<></>}>
        <Logo />
        <NavBar />
        <CoverVideo />
      </Suspense>
    </Section>
  );
};

export default Lan; // Export Lan
