"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      const data = await res.json()
      setPokemons(data.results)
    }
    fetchData()
  }, [])

  return(
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.name}>
          <button><p>{pokemon.name}</p></button>
        </div>
      ))}
    </div>
  )
}