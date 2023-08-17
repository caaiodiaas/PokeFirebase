import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { pokemonsCollection } from '../lib/controller'
import { NewPokemonType } from '../types/pokemon'
import Information from './Information'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

function Card() {
  const [pokemons, setPokemons] = useState<NewPokemonType[]>([])

  const navigate = useNavigate()

  if (!localStorage.getItem('user')) navigate('/login')

  useEffect(
    () =>
      onSnapshot(
        pokemonsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          setPokemons(
            snapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data(),
              }
            }),
          )
        },
      ),
    [],
  )

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col">
        <h1 className="text-gray-600">Todos Pokemons</h1>
        {pokemons && pokemons.length ? (
          <div className="individual-card">
            {pokemons?.map(pokemon =>
              pokemon.image ? (
                <Information key={pokemon.id} pokemon={pokemon} />
              ) : (
                <div>
                  <h1>Carregando...</h1>
                </div>
              ),
            )}
          </div>
        ) : (
          <h2 className="no-pokemons">
            Ainda não existem pokemons, adicione algum.
          </h2>
        )}
      </div>
    </div>
  )
}

export default Card
