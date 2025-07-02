import React from "react";

const Card = ({ name, img, status }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        className="card-img"
        src={img}
        alt={name}
      />
      <p className="card-name">{name}</p>
      <p className={`card-status ${status === "Offline" ? "offline" : "online"}`}>{status}</p>
    </div>
  );
};

export default Card;
