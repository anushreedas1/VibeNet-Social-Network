import "./App.css";
import Pages from "./Components/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/AppContext/AppContext";
import { AnimatedCursor } from "./Components/AnimatedCursor";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./Components/ErrorBoundary";
import Background from "./Components/Background/Background";


function App() {
  return (
    <ErrorBoundary>
      <div className="relative">
        <Background />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContext>
            <AnimatedCursor />
            <AnimatePresence mode="wait">
              <Pages />
            </AnimatePresence>
          </AppContext>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
