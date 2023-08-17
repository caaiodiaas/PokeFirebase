import React, { useState } from "react";
import { useQuery } from "react-query";
import { GameType } from "../../types/game";
import GameCard from "../GameCard";
import { addGames, fetchData, removeGames } from "./index.logic";

function ReactQueryDestinations() {
  const [favourites, setFavourites] = useState<GameType[]>([]);

  const {
    data: games,
    isLoading,
    isFetching,
  } = useQuery("locations", fetchData);

  if (isLoading) return <p>Loading react query...</p>;
  if (isFetching) return <p>Fetching...</p>;

  return (
    <>
      <GameCard title="Trending Destination">
        {games.length &&
          games?.map((item: GameType) => (
            <div
              key={item.id}
              className="destination"
              onClick={() => addGames(item, favourites, setFavourites)}
            >
              <li>{item.platform}</li>
              <button>+</button>
            </div>
          ))}
      </GameCard>
      <GameCard title="My Destination List">
        {favourites.length ? (
          favourites?.map((item) => (
            <div
              key={item.id}
              className="destination"
              onClick={() => removeGames(item, favourites, setFavourites)}
            >
              <li>{item.platform}</li>
              <button>-</button>
            </div>
          ))
        ) : (
          <p>Nothing added to your list yet</p>
        )}
      </GameCard>
    </>
  );
}

export default ReactQueryDestinations;
