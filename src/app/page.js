"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [pokedata, setPokedata] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      const data = await res.json()
      const res2 = await fetch(data.results[0].url)
      const data2 = await res2.json()
      setPokemons(data.results)
      setPokedata(data2.sprites)
    }
    fetchData()
  }, [])

  const handleSwitch = async (index) => {
    const res = await fetch(pokemons[index].url)
    const data = await res.json()
    setPokedata(data.sprites)
  }

  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="flex bg-white shadow-lg rounded-lg p-6 w-3/4 h-[600px]">
      {/* Image Section */}
      <div className="w-1/3 flex justify-center items-center">
        <img src={pokedata.front_default} alt="pokemon" className="w-48 h-48 object-contain"/>
      </div>

      {/* Scrollable Pokémon List */}
      <div className="w-2/3 overflow-y-auto max-h-[500px] border-l-2 border-gray-300 pl-4">
        {pokemons.map((pokemon, i) => (
          <div key={pokemon.name} className="mb-2">
            <button 
              onClick={() => handleSwitch(i)} 
              className="w-full text-left bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {pokemon.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}