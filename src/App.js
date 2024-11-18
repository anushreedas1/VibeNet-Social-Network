import "./App.css";
import Pages from "./Components/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/AppContext/AppContext";
import { AnimatedCursor } from "./Components/AnimatedCursor";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <AppContext>
          
            <AnimatedCursor />
            <AnimatePresence mode="wait">
              <Pages />
            </AnimatePresence>
         
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
