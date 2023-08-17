import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { pokemonsCollection } from "../../lib/controller";
import { NewPokemonType } from "../../types/pokemon";

const Search: React.FC = () => {
  const [pokemons, setPokemons] = useState<NewPokemonType[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<NewPokemonType[]>(
    []
  );
  //   const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      onSnapshot(
        pokemonsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          setPokemons(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
          );
        }
      ),
    []
  );

  const handleSearch = () => {
    // if (search === "") return;
    if (searchRef.current?.value === null) return;
    setFilteredPokemons(
      pokemons.filter((pokemon) => {
        return pokemon
          .name!.toLowerCase()
          .includes(searchRef.current?.value as string);
      })
    );
  };

  return (
    <div className="search__page">
      <div className="search">
        <input
          type="text"
          className="inputsearch"
          placeholder="Search for a pokemon"
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button onClick={handleSearch}>Go</button>
      </div>
      <div>
        {filteredPokemons.length ? (
          filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="search__title">
              <Link to={`/pokemons/${pokemon.id}`}>
                <h1>{pokemon.name}</h1>
              </Link>
            </div>
          ))
        ) : (
          <h1>No pokemons found</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
