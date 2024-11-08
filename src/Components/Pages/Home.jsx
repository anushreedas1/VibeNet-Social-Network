import React from "react";
import LeftSide from "../LeftSidebar/LeftSide";
import CardSection from "../Main/CardSection";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar />
      </div>
      <div className="flex flex-grow bg-gray-100 pt-16"> {/* Added pt-16 for navbar space */}
        <div className="flex-auto w-[20%] fixed top-16">
          <LeftSide />
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-16 bg-gray-100 rounded-xl">
          <div className="w-[80%] mx-auto">
            <CardSection />
            <Main />
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-16">
          <RightSide />
        </div>
      </div>

      {/* Footer at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Home;
