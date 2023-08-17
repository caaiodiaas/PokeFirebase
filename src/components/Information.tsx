import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePokemon } from "../lib/controller";
import { NewPokemonType } from "../types/pokemon";
import Edit from "./Edit";

interface IProps {
  pokemon: NewPokemonType;
  detailsPage?: boolean;
}

function Information({ pokemon, detailsPage }: IProps) {
  const [editDescription, setEditDescription] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="pokemon-preview">
      <div className="image-container">
        <img className="location-image" src={pokemon.image} alt="Pokemon" />
        <div className="highlights">
          <div className="highlights-text">
            <h2>{pokemon.name}</h2>
          </div>
        </div>
      </div>

      <div className="description">
        {detailsPage ? (
          <>
            <span className="feature">Type: {pokemon?.type}</span>
            <hr />
            <span className="feature">Height: {pokemon?.weight}</span>
            <hr />
            <span className="feature">Weight: {pokemon?.weight}</span>
            <hr />
            <p className="description-text">
              <button onClick={() => setEditDescription(!editDescription)}>
                Edit Pokemon
              </button>
              {editDescription ? (
                <Edit
                  editDescription={editDescription}
                  setEditDescription={setEditDescription}
                  id={pokemon.id}
                  type={pokemon?.type ?? ""}
                  height={pokemon?.height ?? ""}
                  weight={pokemon?.weight ?? ""}
                />
              ) : null}
            </p>
            <button onClick={() => deletePokemon(pokemon.id, navigate)}>
              Delete Pokemon
            </button>
          </>
        ) : (
          <Link to={`/pokemons/${pokemon.id}`}>
            <button className="moreinfo-btn">Details</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Information;
