import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../lib/controller";
import Information from "./Information";
import Navbar from "./Navbar";

function Details() {
  const { id } = useParams();

  // Fetch a single document
  const getPokemon = doc(firestore, `pokemons/${id}`);

  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  if (!localStorage.getItem("user")) navigate("/login");

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      const docSnap = await getDoc(getPokemon);
      if (docSnap.exists()) {
        const newPokemonObj = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setPokemon(newPokemonObj);
        setIsLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document");
      }
    };
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div className="loading" />;
  return (
    <div>
      <Navbar />
      <div className="pokemon-details">
        {Object.keys(pokemon) && Object.keys(pokemon).length ? (
          <Information pokemon={pokemon} detailsPage />
        ) : null}
      </div>
    </div>
  );
}

export default Details;
