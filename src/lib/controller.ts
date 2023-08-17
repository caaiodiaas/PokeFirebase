import {
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavigateFunction } from "react-router-dom";
// This is tree shaking from firestore

import { AddPokemonType } from "../types/pokemon";

import { app } from "./firebase";

export const firestore = getFirestore(app);

// HOTELS COLLECTION
export const pokemonsCollection = collection(firestore, "pokemons");

// ADD A NEW DOCUMENT TO YOUR COLLECTION
export const addPokemon = async (pokemonData: AddPokemonType) => {
  const { image, ...rest } = pokemonData;
  if (image) {
    const storage = getStorage(app);

    const fileRef = ref(storage, `images/${rest.name}`);

    await uploadBytes(fileRef, image);

    const url = await getDownloadURL(fileRef);

    await addDoc(pokemonsCollection, {
      ...rest,
      image: url,
    });
  }
};

// export const uploadImage = async (file: File, name: string) => {

// };

// DELETE A DOCUMENT IN YOUR COLLECTION
export const deletePokemon = async (
  id: string | undefined,
  navigate: NavigateFunction
) => {
  const document = doc(firestore, `pokemons/${id}`);
  await deleteDoc(document);
  console.log(`The pokemon has now been deleted`);
  navigate("/");
};

// EDIT A DOCUMENT / DESCRIPTION
export const updatePokemon = async (id: string | undefined, docData: any) => {
  const getPokemon = doc(firestore, `pokemons/${id}`);
  await setDoc(getPokemon, docData, { merge: true });
  console.log("The value has been written to the database");
};
