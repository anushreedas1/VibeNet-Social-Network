import React from "react";
import { cardData } from "../../assets/cardData";
import Card from "./Card";
import "./CardSection.css";

const CardSection = () => {
  return (
    <div className="card-section-scroll">
      {cardData.map((card) => (
        <div key={card.id} className="card-section-item">
          <Card
            id={card.id}
            name={card.name}
            img={card.image}
            status={card.status}
          />
        </div>
      ))}
    </div>
  );
};

export default CardSection;
