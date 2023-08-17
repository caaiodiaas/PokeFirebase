import React from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}

function GameCard({ title, children }: IProps) {
  return (
    <div className="game-card">
      <h2>{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}

export default GameCard;
