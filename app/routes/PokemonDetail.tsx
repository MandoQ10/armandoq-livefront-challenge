import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { pokemonApi } from "~/api/pokemon/pokemonApi";
import Card from "~/components/Card/Card";
import { splitStringByDash } from '~/utils/splitStringByDash';
import type { Route } from "../+types/root";
import axios from 'axios';

export function meta({}: Route.MetaArgs) {
  const { name } = useParams();

  return [
    { title: `Pokemon Generations - ${name}` },
    { name: "description", content: `Viewing ${name} details` },
  ];
}

function PokemonDetail() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  useEffect(() => {
    const fetchPokemonData = async () => {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          setPokemonData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });
    }
    fetchPokemonData();
  }, []);

  if (!pokemonData) return <p>Loading Pokémon details...</p>;

  return (
    <main className="flex flex-col items-center m-6">
      <Card modifiers={'w-1/2 gap-6'}>
        <div className="flex flex-row justify-between">
          <h1>{ splitStringByDash(pokemonData.name)}</h1>
          <img height="96" width="96" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
        <div className="flex justify-between gap-6">
          <div>
            <h2>Types</h2>
            {pokemonData.types.map((typeObject) => (
            <div key={typeObject.type.name}>{splitStringByDash(typeObject.type.name)}</div>
            ))}
          </div>
          <div className="w-sm">
            <h2>Base Stats</h2>
            { pokemonData.stats.map((statsObject) => (
              <div className="flex justify-between" key={statsObject.stat.name}>
                <span>{splitStringByDash(statsObject.stat.name)}</span>
                <span>{statsObject.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>Moves</h2>
          <ul className="flex flex-wrap">
            { pokemonData.moves.map((movesObject) => (
                <li key={movesObject.move.name} className="w-1/2">
                  {splitStringByDash(movesObject.move.name)}
                </li>
            ))}
          </ul>
        </div>
      </Card>
    </main>
  );
}

export default PokemonDetail;