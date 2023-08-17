import { GameType } from "../../types/game";

export const addGames = (
  game: GameType,
  favourites: GameType[],
  setFavourites: React.Dispatch<React.SetStateAction<GameType[]>>
) => {
  if (!favourites.includes(game)) {
    setFavourites([...favourites, game]);
  } else {
    setFavourites([...favourites.filter((item) => item !== game)]);
  }
};

export const removeGames = (
  game: GameType,
  favourites: GameType[],
  setFavourites: React.Dispatch<React.SetStateAction<GameType[]>>
) => {
  setFavourites([...favourites.filter((item) => item !== game)]);
};

export const fetchData = async () => {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url).then((res) => res.json());
    return response;
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        console.log("api request has been cancelled");
      }
      console.log(err.name);
    } else {
      console.log("This is an unknown error");
    }
  }
};
