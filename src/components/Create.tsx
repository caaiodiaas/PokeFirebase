import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPokemon } from '../lib/controller'
import Navbar from './Navbar'

function Create() {
  const [name, setName] = useState('')
  const [height, setHeight] = useState('')
  const [type, setType] = useState('')
  const [weight, setWeitght] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const navigate = useNavigate()

  if (!localStorage.getItem('user')) navigate('/login')

  const addNewPokemon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPokemon({
      name,
      height,
      type,
      weight,
      image: image ?? undefined,
    })
    console.log('successfully added a new pokemon ', image)
    navigate('/')
  }

  console.log('image', image)

  return (
    <div>
      {' '}
      <Navbar />
      <div className="create">
        <h2>Adicionar novo pokemon</h2>
        <form onSubmit={e => addNewPokemon(e)}>
          <label>Nome:</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label>Tipo:</label>
          <input
            type="text"
            required
            value={type}
            onChange={e => setType(e.target.value)}
          />
          <label>Altura:</label>
          <input
            type="number"
            required
            value={height}
            onChange={e => setHeight(e.target.value)}
          />
          <label>Peso:</label>
          <input
            type="number"
            required
            value={weight}
            onChange={e => setWeitght(e.target.value)}
          />

          <label>Imagem:</label>
          <input
            type="file"
            required
            onChange={e => setImage(e.target.files![0])}
          />
          <button>Adicionar Pokemon</button>
        </form>
      </div>
    </div>
  )
}

export default Create
