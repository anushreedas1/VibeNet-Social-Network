import "./App.css";
import Pages from "./Components/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/AppContext/AppContext";
import { AnimatedCursor } from "./Components/AnimatedCursor";
import { AnimatePresence } from "framer-motion";
import Background from "./Components/Background/Background";

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <AppContext>
          <Background>
            <AnimatedCursor />
            <AnimatePresence mode="wait">
              <Pages />
            </AnimatePresence>
          </Background>
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;