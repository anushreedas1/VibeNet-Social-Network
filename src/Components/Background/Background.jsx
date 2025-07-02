import React from "react";
import "./Background.css";

// Spooky/old background removed. Vanta background is managed elsewhere.

const Background = (props) => {
  // Simple, robust animated CSS background (gradient animation)
  return (
    <div id="css-background" className="css-background">
      {props.children}
    </div>
  );
};

export default Background;
